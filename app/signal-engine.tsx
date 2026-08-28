'use client';

import { useEffect, useRef } from 'react';

const vertex = `#version 300 es
precision highp float;
in vec3 a_position;
in float a_tone;
in float a_delay;
in float a_size;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
uniform float u_progress;
uniform float u_scroll;
out float v_tone;
out float v_alpha;
out float v_depth;

mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float ease(float x){return 1.-pow(1.-clamp(x,0.,1.),4.);}

void main(){
  float built=ease(smoothstep(a_delay,a_delay+.18,u_progress));
  vec3 p=a_position;
  float seed=fract(sin(dot(p.xz,vec2(41.73,289.21)))*43758.5453);
  vec3 scatter=vec3(cos(seed*6.2831),-1.2-seed*2.4,sin(seed*6.2831))*(1.4+seed*2.8);
  p=mix(scatter,p,built);
  p.xz=rot(.02+(u_pointer.x-.5)*.16+sin(u_time*.12)*.025+u_scroll*.08)*p.xz;
  p.yz=rot(-.04+(u_pointer.y-.5)*.06)*p.yz;
  p.y-=.06;
  float depth=7.4-p.z;
  float aspect=u_resolution.x/u_resolution.y;
  float portrait=step(aspect,.75);
  vec2 projected=vec2(p.x/max(aspect,1.),p.y-.08)/(depth*.44);
  projected*=mix(1.,.48,portrait);
  projected.y+=portrait*.26;
  gl_Position=vec4(projected,(depth-3.2)/7.2*2.-1.,1.);
  float pixelScale=min(u_resolution.x,u_resolution.y)/900.;
  gl_PointSize=max(1.5,a_size*pixelScale*(7.2/depth)*built);
  v_tone=a_tone;
  v_alpha=built;
  v_depth=depth;
}`;

const fragment = `#version 300 es
precision highp float;
in float v_tone;
in float v_alpha;
in float v_depth;
out vec4 outColor;

void main(){
  vec3 deep=vec3(.05,.20,.105);
  vec3 agave=vec3(.23,.70,.38);
  vec3 acid=vec3(.79,1.,.28);
  vec3 cream=vec3(1.,.94,.70);
  vec3 amber=vec3(1.,.36,.08);
  vec3 col=v_tone<.32?mix(deep,agave,v_tone/.32):v_tone<.72?mix(agave,acid,(v_tone-.32)/.4):v_tone<.94?mix(acid,cream,(v_tone-.72)/.22):amber;
  vec2 q=gl_PointCoord;
  float bevel=1.-smoothstep(.34,.5,max(abs(q.x-.5),abs(q.y-.5)));
  float face=.62+q.y*.38;
  col*=face*mix(.62,1.,clamp((8.-v_depth)/5.,0.,1.));
  col+=vec3(.13,.22,.12)*bevel;
  outColor=vec4(col,v_alpha*bevel);
}`;

type Voxel={x:number;y:number;z:number;tone:number;delay:number;size:number};

function random(n:number){const x=Math.sin(n*91.713+17.19)*43758.5453;return x-Math.floor(x);}

function createAgave(){
  const voxels:Voxel[]=[];
  const tips:number[][]=[];
  for(let i=0;i<19;i++){
    const a=-Math.PI/2+i/19*Math.PI*2,len=2.65+random(i+51)*.72;
    tips.push([Math.cos(a)*len,Math.sin(a)*len*.68,(random(i+91)-.5)*1.15,.46+random(i+22)*.1]);
  }
  for(let i=0;i<13;i++){
    const a=-Math.PI/2+.21+i/13*Math.PI*2,len=1.45+random(i+151)*.58;
    tips.push([Math.cos(a)*len,Math.sin(a)*len*.78,(random(i+191)-.5)*.72,.36+random(i+42)*.08]);
  }
  const bezier=(a:number,b:number,c:number,d:number,s:number)=>{const k=1-s;return k*k*k*a+3*k*k*s*b+3*k*s*s*c+s*s*s*d;};
  const derivative=(a:number,b:number,c:number,d:number,s:number)=>3*(1-s)*(1-s)*(b-a)+6*(1-s)*s*(c-b)+3*s*s*(d-c);
  tips.forEach((tip,index)=>{
    const [tx,ty,tz,maxWidth]=tip;
    const segments=50;
    const across=9;
    const controlY=ty*.24+.16;
    for(let sIndex=0;sIndex<segments;sIndex++){
      const s=sIndex/(segments-1);
      const xCenter=bezier(0,tx*.08,tx*.62,tx,s);
      const yCenter=bezier(0,controlY,ty*.78,ty,s);
      const zCenter=bezier(0,tz*.12,tz*.68,tz,s);
      const dx=derivative(0,tx*.08,tx*.62,tx,s);
      const dy=derivative(0,controlY,ty*.78,ty,s);
      const norm=Math.max(.001,Math.hypot(dx,dy));
      const normalX=-dy/norm,normalY=dx/norm;
      const width=maxWidth*(.42+.76*Math.pow(Math.sin(Math.PI*Math.min(.995,s)),.7))*Math.pow(1-s,.42)+.022;
      for(let aIndex=0;aIndex<across;aIndex++){
        const side=(aIndex/(across-1)-.5)*2;
        const ridge=1-Math.abs(side);
        const jitter=(random(index*10000+sIndex*100+aIndex)-.5)*.035;
        const x=xCenter+normalX*side*width;
        const y=yCenter+normalY*side*width+ridge*width*.11+jitter;
        const z=zCenter+side*width*.08;
        const tip=s>.92;
        const edge=Math.abs(side)>.88;
        const depthTone=tz<0?.18:.35;
        voxels.push({x,y,z,tone:tip?.97:Math.min(.92,depthTone+ridge*.28+s*.18+random(aIndex+index)*.04),delay:.04+s*.58+(index%5)*.016+random(sIndex*19+index)*.055,size:5.25*(tip?.66:1)*(edge?.78:1)});
        if(ridge>.82&&sIndex%2===0)voxels.push({x,y:y+.018,z:z-.015,tone:.84,delay:.08+s*.58,size:3.1});
      }
    }
  });
  for(let i=0;i<1350;i++){
    const a=random(i)*Math.PI*2,r=Math.pow(random(i+1300),.55)*4.4;
    voxels.push({x:Math.cos(a)*r,y:Math.sin(a)*r*.55,z:-.8+random(i+20)*.25,tone:.08+random(i+10)*.1,delay:.02+random(i+7)*.84,size:2+random(i)*2.4});
  }
  return voxels;
}

function compile(gl:WebGL2RenderingContext,type:number,source:string){const shader=gl.createShader(type);if(!shader)return null;gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){console.error(gl.getShaderInfoLog(shader));return null;}return shader;}

export default function SignalEngine(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl=canvas.getContext('webgl2',{antialias:false,alpha:false,powerPreference:'high-performance'});
    if(!gl){canvas.dataset.fallback='true';return;}
    const vs=compile(gl,gl.VERTEX_SHADER,vertex),fs=compile(gl,gl.FRAGMENT_SHADER,fragment);if(!vs||!fs){canvas.dataset.fallback='true';return;}
    const program=gl.createProgram();if(!program)return;gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.useProgram(program);
    const voxels=createAgave(),stride=6,data=new Float32Array(voxels.length*stride);
    voxels.forEach((v,i)=>data.set([v.x,v.y,v.z,v.tone,v.delay,v.size],i*stride));
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    const bind=(name:string,size:number,offset:number)=>{const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,stride*4,offset*4);};
    bind('a_position',3,0);bind('a_tone',1,3);bind('a_delay',1,4);bind('a_size',1,5);
    const resolution=gl.getUniformLocation(program,'u_resolution'),pointerLoc=gl.getUniformLocation(program,'u_pointer'),time=gl.getUniformLocation(program,'u_time'),progress=gl.getUniformLocation(program,'u_progress'),scroll=gl.getUniformLocation(program,'u_scroll');
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(.012,.027,.018,1);
    let target={x:.5,y:.5},raf=0,visible=true;const pointer={...target},start=performance.now();
    const resize=()=>{const dpr=Math.min(devicePixelRatio,innerWidth<720?1.25:1.65),rect=canvas.getBoundingClientRect();canvas.width=Math.max(1,Math.floor(rect.width*dpr));canvas.height=Math.max(1,Math.floor(rect.height*dpr));gl.viewport(0,0,canvas.width,canvas.height);};
    const move=(e:PointerEvent)=>{target={x:e.clientX/innerWidth,y:1-e.clientY/innerHeight};};
    const onVisibility=()=>{visible=!document.hidden;if(visible&&!raf)raf=requestAnimationFrame(draw);};
    const draw=(ms:number)=>{raf=0;if(!visible)return;pointer.x+=(target.x-pointer.x)*.04;pointer.y+=(target.y-pointer.y)*.04;gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform2f(pointerLoc,pointer.x,pointer.y);gl.uniform1f(time,reduce?7:ms*.001);gl.uniform1f(progress,reduce?1:Math.min(1,(ms-start)/5200));gl.uniform1f(scroll,Math.min(1,scrollY/innerHeight));gl.drawArrays(gl.POINTS,0,voxels.length);if(!reduce)raf=requestAnimationFrame(draw);};
    const ro=new ResizeObserver(resize);ro.observe(canvas);resize();addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',onVisibility);raf=requestAnimationFrame(draw);
    return()=>{ro.disconnect();removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',onVisibility);cancelAnimationFrame(raf);gl.deleteBuffer(buffer);gl.deleteProgram(program);};
  },[]);
  return <canvas ref={ref} className="signal-engine" aria-label="A procedural agave plant assembling from thousands of coded pixel blocks"/>;
}
