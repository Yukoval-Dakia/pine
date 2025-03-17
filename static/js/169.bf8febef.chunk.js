"use strict";(self.webpackChunkthe_center_believer_frontend=self.webpackChunkthe_center_believer_frontend||[]).push([[169],{169:(e,o,r)=>{r.r(o),r.d(o,{default:()=>m});var i=r(43),t=r(464),n=r(996),a=r(59),l=r(579);const s=t.i7`
  0% { border-color: #ff0000; }
  14% { border-color: #ff7f00; }
  28% { border-color: #ffff00; }
  42% { border-color: #00ff00; }
  57% { border-color: #0000ff; }
  71% { border-color: #4b0082; }
  85% { border-color: #9400d3; }
  100% { border-color: #ff0000; }
`,d=t.Ay.div`
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
  border: 6px solid #ff0000;
  animation: ${s} 5s linear infinite;
`,c=t.i7`
  0% { opacity: 0; }
  100% { opacity: 1; }
`,g=t.Ay.div`
  width: 100%;
  height: 350px;
  background-image: url(${e=>e.$image});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  animation: ${c} 0.5s ease-in-out;
`,f=t.Ay.div`
  padding: 10px 20px;
  background-color: ${e=>e.$bgColor};
`,b=t.Ay.h2`
  margin: 0;
  color: ${e=>e.$textColor};
  font-size: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  text-align: center;
  padding: 5px 0;
  }
`,p=t.Ay.div`
  color: ${e=>e.$textColor};
  padding: 10px 25px;
  display: block;
  margin: 0 auto;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  width: fit-content;
`,x=t.Ay.div`
  padding: 20px 10px 10px 10px;
  background-color: ${e=>e.$bgColor};
  width: 100%;
`,u=t.i7`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`,$=t.Ay.div`
  width: 100%;
  height: 350px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${u} 1.5s infinite linear forwards;
`,h=["#4A90E2","#50E3C2","#F5A623","#D0021B","#9013FE","#417505","#8B572A","#000000"],m=e=>{let{scientist:o,isVisible:r,preloaded:t=!1}=e;const{language:s}=(0,n.o)(),c=(0,a.s)(s),[u,m]=(0,i.useState)(t),[k,C]=(0,i.useState)(o.image||""),v=o._id||o.name,{bgColor:w,textColor:y}=(0,i.useMemo)((()=>{let e=0;for(let i=0;i<v.length;i++)e=v.charCodeAt(i)+((e<<5)-e);const o=Math.abs(e%h.length),r=h[o];return{bgColor:r,textColor:(e=>{const o=e.replace("#",""),r=parseInt(o.slice(0,2),16),i=255-parseInt(o.slice(2,4),16),t=255-parseInt(o.slice(4,6),16);return`#${(255-r).toString(16).padStart(2,"0")}${i.toString(16).padStart(2,"0")}${t.toString(16).padStart(2,"0")}`})(r)}}),[v]);return(0,i.useEffect)((()=>{if(!o.image||t)return void m(!0);const e=new Image;e.onload=()=>{m(!0)},e.onerror=()=>{console.log("\u4f7f\u7528\u5907\u7528\u56fe\u7247:",o.fallbackImage),C(o.fallbackImage||"");const e=new Image;e.onload=()=>{m(!0)},e.onerror=()=>{m(!0)},e.src=o.fallbackImage||""},e.src=o.image}),[o.image,o.fallbackImage,t]),(0,l.jsxs)(d,{$isVisible:r,$bgColor:w,children:[(0,l.jsx)(x,{$bgColor:w,children:(0,l.jsxs)(p,{$textColor:y,$bgColor:`${w}`,children:[c.scientist.subjectPrefix," ",o.subject||"\u672a\u77e5\u5b66\u79d1"]})}),u?(0,l.jsx)(g,{$image:k}):(0,l.jsx)($,{}),(0,l.jsx)(f,{$bgColor:w,children:(0,l.jsx)(b,{$textColor:y,children:o.name})})]})}}}]);
//# sourceMappingURL=169.bf8febef.chunk.js.map