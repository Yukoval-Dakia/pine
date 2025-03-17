"use strict";(self.webpackChunkthe_center_believer_frontend=self.webpackChunkthe_center_believer_frontend||[]).push([[169],{169:(e,o,t)=>{t.r(o),t.d(o,{default:()=>$});var i=t(43),r=t(464),a=t(996),n=t(59),s=t(579);const l=r.Ay.div`
  background-color: ${e=>e.$bgColor};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  width: 80%;
  max-width: 500px;
  position: relative;
  z-index: 1002;
  opacity: ${e=>e.$isVisible?1:0};
  transform: ${e=>e.$isVisible?"scale(1)":"scale(0.9)"};
  transition: opacity 0.3s ease, transform 0.3s ease;
`,c=r.i7`
  0% { opacity: 0; }
  100% { opacity: 1; }
`,d=r.Ay.div`
  width: 100%;
  height: 350px;
  background-image: url(${e=>e.$image});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  animation: ${c} 0.5s ease-in-out;
`,g=r.Ay.div`
  padding: 20px;
  background-color: ${e=>e.$bgColor};
`,p=r.Ay.h2`
  margin: 0;
  color: ${e=>e.$textColor};
  font-size: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background-color: ${e=>e.$textColor};
  }
`,b=r.Ay.div`
  background-color: ${e=>e.$bgColor};
  color: ${e=>e.$textColor};
  padding: 10px 25px;
  border-radius: 20px;
  display: block;
  margin: 0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  width: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`,x=r.Ay.div`
  padding: 20px 0 10px 0;
  background-color: ${e=>e.$bgColor};
  width: 100%;
`,f=r.i7`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`,u=r.Ay.div`
  width: 100%;
  height: 350px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${f} 1.5s infinite linear forwards;
`,h=["#4A90E2","#50E3C2","#F5A623","#D0021B","#9013FE","#417505","#8B572A","#000000"],$=e=>{let{scientist:o,isVisible:t,preloaded:r=!1}=e;const{language:c}=(0,a.o)(),f=(0,n.s)(c),[$,m]=(0,i.useState)(r),[k,C]=(0,i.useState)(o.image||""),w=o._id||o.name,{bgColor:v,textColor:y}=(0,i.useMemo)((()=>{let e=0;for(let i=0;i<w.length;i++)e=w.charCodeAt(i)+((e<<5)-e);const o=Math.abs(e%h.length),t=h[o];return{bgColor:t,textColor:(e=>{const o=e.replace("#",""),t=parseInt(o.slice(0,2),16),i=255-parseInt(o.slice(2,4),16),r=255-parseInt(o.slice(4,6),16);return`#${(255-t).toString(16).padStart(2,"0")}${i.toString(16).padStart(2,"0")}${r.toString(16).padStart(2,"0")}`})(t)}}),[w]);return(0,i.useEffect)((()=>{if(!o.image||r)return void m(!0);const e=new Image;e.onload=()=>{m(!0)},e.onerror=()=>{console.log("\u4f7f\u7528\u5907\u7528\u56fe\u7247:",o.fallbackImage),C(o.fallbackImage||"");const e=new Image;e.onload=()=>{m(!0)},e.onerror=()=>{m(!0)},e.src=o.fallbackImage||""},e.src=o.image}),[o.image,o.fallbackImage,r]),(0,s.jsxs)(l,{$isVisible:t,$bgColor:v,children:[(0,s.jsx)(x,{$bgColor:v,children:(0,s.jsxs)(b,{$textColor:y,$bgColor:`${v}DD`,children:[f.scientist.subjectPrefix," ",o.subject||"\u672a\u77e5\u5b66\u79d1"]})}),$?(0,s.jsx)(d,{$image:k}):(0,s.jsx)(u,{}),(0,s.jsx)(g,{$bgColor:v,children:(0,s.jsx)(p,{$textColor:y,children:o.name})})]})}}}]);
//# sourceMappingURL=169.70325f28.chunk.js.map