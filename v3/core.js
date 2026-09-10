'use strict';
// Real-time procedural 3D geometry. No libraries, network, storage or member data.
(() => {
  const canvas=document.querySelector('#core-canvas');
  const fallback=document.querySelector('#core-fallback');
  const motion=document.querySelector('#motion-button');
  const reset=document.querySelector('#reset-core');
  const hint=document.querySelector('#core-hint');
  const status=document.querySelector('#core-status');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let gl;
  function showFallback(){canvas.hidden=true;fallback.hidden=false;motion.hidden=true;reset.hidden=true;hint.textContent='此裝置顯示靜態視覺';status.textContent='STATIC VIEW';}
  try{gl=canvas.getContext('webgl',{alpha:true,antialias:false,powerPreference:'low-power',preserveDrawingBuffer:false});}catch{showFallback();return;}
  if(!gl){showFallback();return;}
  const vertex=`attribute vec2 a; void main(){gl_Position=vec4(a,0.,1.);}`;
  const fragment=`
    precision highp float;
    uniform vec2 resolution;
    uniform vec2 rotation;
    uniform float phase;
    mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
    float torus(vec3 p){return length(vec2(length(p.xy)-.91,p.z))-.22;}
    float blend(float a,float b){float h=clamp(.5+.5*(b-a)/.15,0.,1.);return mix(b,a,h)-.15*h*(1.-h);}
    float shape(vec3 p){
      vec3 q=p; q.xz=rot(.47)*q.xz; q.yz=rot(.38)*q.yz;
      float a=torus(q);
      vec3 b=p.yzx; b.xz=rot(-.5)*b.xz;
      vec3 c=p.zxy; c.yz=rot(.48)*c.yz;
      return blend(blend(a,torus(b)),torus(c));
    }
    vec3 normalAt(vec3 p){vec2 e=vec2(.003,0.);return normalize(vec3(shape(p+e.xyy)-shape(p-e.xyy),shape(p+e.yxy)-shape(p-e.yxy),shape(p+e.yyx)-shape(p-e.yyx)));}
    vec3 environment(vec3 r){
      vec3 c=vec3(.023,.04,.085);
      c+=vec3(.25,.38,1.)*pow(max(dot(r,normalize(vec3(-.9,.2,.5))),0.),9.)*2.7;
      c+=vec3(.56,1.,.16)*pow(max(dot(r,normalize(vec3(1.,.6,1.))),0.),17.)*2.1;
      c+=vec3(.3,.83,1.)*pow(max(dot(r,normalize(vec3(-.2,-.6,1.))),0.),12.)*1.4;
      float strip=pow(max(1.-abs(dot(r,normalize(vec3(.2,1.,.5)))),0.),42.);
      c+=vec3(.91,.95,1.)*strip*1.9;
      return c;
    }
    void main(){
      vec2 uv=(gl_FragCoord.xy-.5*resolution)/resolution.y;
      vec3 ro=vec3(0.,0.,3.7),rd=normalize(vec3(uv*2.55,-3.1));
      float yaw=rotation.x+phase*.15, pitch=rotation.y+.43;
      ro.xz=rot(yaw)*ro.xz;rd.xz=rot(yaw)*rd.xz;ro.yz=rot(pitch)*ro.yz;rd.yz=rot(pitch)*rd.yz;
      float dist=0.;vec3 p=ro;bool hit=false;
      for(int i=0;i<68;i++){p=ro+rd*dist;float d=shape(p);if(d<.002){hit=true;break;}dist+=d*.82;if(dist>6.)break;}
      if(!hit){gl_FragColor=vec4(0.);return;}
      vec3 n=normalAt(p);vec3 reflectDir=reflect(rd,n);
      float fresnel=pow(1.-max(dot(n,-rd),0.),2.5);
      float diffuse=max(dot(n,normalize(vec3(-.8,1.3,2.))),0.);
      vec3 color=environment(reflectDir)*(.7+fresnel*.8)+vec3(.07,.11,.16)*diffuse;
      color+=vec3(.33,.65,1.)*fresnel*.2;
      float occlusion=clamp(shape(p+n*.12)/.12,.18,1.);color*=.42+.58*occlusion;
      color=color/(color+vec3(.72));color=pow(color,vec3(.78));
      gl_FragColor=vec4(color,1.);
    }`;
  let program;
  try{
    const compile=(type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error('Shader unavailable');return shader;};
    program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Program unavailable');
    gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const attribute=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,0,0);
  }catch{showFallback();return;}
  const resUniform=gl.getUniformLocation(program,'resolution'),rotUniform=gl.getUniformLocation(program,'rotation'),phaseUniform=gl.getUniformLocation(program,'phase');
  let yaw=-.25,pitch=.12,phase=0,paused=reduce.matches,visible=true,lost=false,drag=null,last=0,frame=0;
  function render(){if(lost)return;const box=canvas.getBoundingClientRect();if(box.width<1||box.height<1)return;const scale=Math.min(1.25,window.devicePixelRatio||1,640/Math.max(box.width,box.height));const width=Math.max(1,Math.round(box.width*scale)),height=Math.max(1,Math.round(box.height*scale));if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;gl.viewport(0,0,width,height);}gl.uniform2f(resUniform,width,height);gl.uniform2f(rotUniform,yaw,pitch);gl.uniform1f(phaseUniform,phase);gl.drawArrays(gl.TRIANGLES,0,6);}
  function tick(now){frame=0;if(lost||!visible||document.hidden)return;if(now-last>32){if(!paused&&!drag)phase+=Math.min((now-last)/1000,.05);render();last=now;}if(!paused)frame=requestAnimationFrame(tick);}
  function wake(){if(!frame&&!lost&&visible&&!document.hidden){last=performance.now();render();if(!paused)frame=requestAnimationFrame(tick);}}
  function updateMotion(){motion.textContent=paused?'播放':'暫停';motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'播放自動旋轉':'暫停自動旋轉');status.textContent=paused?'MANUAL MODE':'LIVE 3D';if(paused&&frame){cancelAnimationFrame(frame);frame=0;}wake();}
  motion.addEventListener('click',()=>{paused=!paused;updateMotion();});
  reset.addEventListener('click',()=>{yaw=-.25;pitch=.12;phase=0;render();status.textContent='視角已重設';});
  canvas.addEventListener('pointerdown',event=>{if(event.button!==0)return;drag={id:event.pointerId,x:event.clientX,y:event.clientY};canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;yaw+=(event.clientX-drag.x)*.009;pitch=Math.max(-1.1,Math.min(1.1,pitch+(event.clientY-drag.y)*.006));drag.x=event.clientX;drag.y=event.clientY;render();});
  const release=()=>{drag=null;wake();};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
  canvas.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();if(event.key==='ArrowLeft')yaw-=.16;if(event.key==='ArrowRight')yaw+=.16;if(event.key==='ArrowUp')pitch=Math.max(-1.1,pitch-.1);if(event.key==='ArrowDown')pitch=Math.min(1.1,pitch+.1);render();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;if(frame)cancelAnimationFrame(frame);showFallback();});
  if('ResizeObserver' in window)new ResizeObserver(()=>render()).observe(canvas);else window.addEventListener('resize',render);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible&&frame){cancelAnimationFrame(frame);frame=0;}wake();},{threshold:.05}).observe(canvas);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}wake();});
  reduce.addEventListener('change',()=>{paused=reduce.matches;updateMotion();});
  updateMotion();
})();
