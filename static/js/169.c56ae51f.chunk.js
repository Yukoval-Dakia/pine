"use strict";(self.webpackChunkthe_center_believer_frontend=self.webpackChunkthe_center_believer_frontend||[]).push([[169],{169:(e,o,i)=>{i.r(o),i.d(o,{default:()=>m});var t=i(43),r=i(464),a=i(996),n=i(59),s=i(579);const l=r.Ay.div`
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
`,d=r.i7`
  0% { opacity: 0; }
  100% { opacity: 1; }
`,c=r.Ay.div`
  width: 100%;
  height: 350px;
  background-image: url(${e=>e.$image});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  border-bottom: 5px solid gold;
  animation: ${d} 0.5s ease-in-out;
`,f=r.Ay.div`
  padding: 20px;
`,g=r.Ay.h2`
  margin: 0;
  color: ${e=>e.$color};
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
    background-color: ${e=>e.$color};
  }
`,b=r.Ay.div`
  background-color: ${e=>e.$color}22;
  color: ${e=>e.$color};
  padding: 10px 25px;
  border-radius: 20px;
  display: block;
  margin: 0 auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  width: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`,p=r.Ay.div`
  padding: 20px 0 10px 0;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
`,x=r.i7`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`,h=r.Ay.div`
  width: 100%;
  height: 350px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${x} 1.5s infinite linear forwards;
  border-bottom: 5px solid #edeef1;
`,u=["#f8f9fa","#e9f5f9","#f9f5e9","#f5e9f9","#e9f9f5","#f9e9e9","#e9e9f9","#f5f9e9"],m=e=>{let{scientist:o,isVisible:i,preloaded:r=!1}=e;const{language:d}=(0,a.o)(),x=(0,n.s)(d),[m,$]=(0,t.useState)(r),[k,w]=(0,t.useState)(o.image||""),v=o._id||o.name,y=(0,t.useMemo)((()=>{let e=0;for(let i=0;i<v.length;i++)e=v.charCodeAt(i)+((e<<5)-e);const o=Math.abs(e%u.length);return u[o]}),[v]);return(0,t.useEffect)((()=>{if(!o.image||r)return void $(!0);const e=new Image;e.onload=()=>{$(!0)},e.onerror=()=>{console.log("\u4f7f\u7528\u5907\u7528\u56fe\u7247:",o.fallbackImage),w(o.fallbackImage||"");const e=new Image;e.onload=()=>{$(!0)},e.onerror=()=>{$(!0)},e.src=o.fallbackImage||""},e.src=o.image}),[o.image,o.fallbackImage,r]),(0,s.jsxs)(l,{$isVisible:i,$bgColor:y,children:[(0,s.jsx)(p,{children:(0,s.jsxs)(b,{$color:o.color||"#3498db",children:[x.scientist.subjectPrefix," ",o.subject||"\u672a\u77e5\u5b66\u79d1"]})}),m?(0,s.jsx)(c,{$image:k}):(0,s.jsx)(h,{}),(0,s.jsx)(f,{children:(0,s.jsx)(g,{$color:o.color||"#3498db",children:o.name})})]})}}}]);
//# sourceMappingURL=169.c56ae51f.chunk.js.map