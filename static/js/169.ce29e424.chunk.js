"use strict";(self.webpackChunkthe_center_believer_frontend=self.webpackChunkthe_center_believer_frontend||[]).push([[169],{169:(e,o,t)=>{t.r(o),t.d(o,{default:()=>$});var r=t(43),i=t(464),a=t(996),n=t(59),s=t(579);const l=i.Ay.div`
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
`,d=i.i7`
  0% { opacity: 0; }
  100% { opacity: 1; }
`,c=i.Ay.div`
  width: 100%;
  height: 350px;
  background-image: url(${e=>e.$image});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  animation: ${d} 0.5s ease-in-out;
`,g=i.Ay.div`
  padding: 20px;
  background-color: ${e=>e.$bgColor};
`,b=i.Ay.h2`
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
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  padding: 20px 0 10px 0;
  background-color: ${e=>e.$bgColor};
  width: 100%;
`,u=i.i7`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`,f=i.Ay.div`
  width: 100%;
  height: 350px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${u} 1.5s infinite linear forwards;
`,h=["#4A90E2","#50E3C2","#F5A623","#D0021B","#9013FE","#417505","#8B572A","#000000"],$=e=>{let{scientist:o,isVisible:t,preloaded:i=!1}=e;const{language:d}=(0,a.o)(),u=(0,n.s)(d),[$,m]=(0,r.useState)(i),[k,C]=(0,r.useState)(o.image||""),w=o._id||o.name,{bgColor:v,textColor:y}=(0,r.useMemo)((()=>{let e=0;for(let r=0;r<w.length;r++)e=w.charCodeAt(r)+((e<<5)-e);const o=Math.abs(e%h.length),t=h[o];return{bgColor:t,textColor:(e=>{const o=e.replace("#",""),t=parseInt(o.substr(0,2),16),r=255-parseInt(o.substr(2,2),16),i=255-parseInt(o.substr(4,2),16);return`#${(255-t).toString(16).padStart(2,"0")}${r.toString(16).padStart(2,"0")}${i.toString(16).padStart(2,"0")}`})(t)}}),[w]);return(0,r.useEffect)((()=>{if(!o.image||i)return void m(!0);const e=new Image;e.onload=()=>{m(!0)},e.onerror=()=>{console.log("\u4f7f\u7528\u5907\u7528\u56fe\u7247:",o.fallbackImage),C(o.fallbackImage||"");const e=new Image;e.onload=()=>{m(!0)},e.onerror=()=>{m(!0)},e.src=o.fallbackImage||""},e.src=o.image}),[o.image,o.fallbackImage,i]),(0,s.jsxs)(l,{$isVisible:t,$bgColor:v,children:[(0,s.jsx)(x,{$bgColor:v,children:(0,s.jsxs)(p,{$textColor:y,$bgColor:`${v}DD`,children:[u.scientist.subjectPrefix," ",o.subject||"\u672a\u77e5\u5b66\u79d1"]})}),$?(0,s.jsx)(c,{$image:k}):(0,s.jsx)(f,{}),(0,s.jsx)(g,{$bgColor:v,children:(0,s.jsx)(b,{$textColor:y,children:o.name})})]})}}}]);
//# sourceMappingURL=169.ce29e424.chunk.js.map