"use strict";(self.webpackChunkthe_center_believer_frontend=self.webpackChunkthe_center_believer_frontend||[]).push([[169],{169:(e,t,i)=>{i.r(t),i.d(t,{default:()=>h});var r=i(43),a=i(464),s=i(996),o=i(59),n=i(579);const c=a.Ay.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1002;
  text-align: center;
  color: white;
  width: 400px;
  border: 5px solid gold;
  border-radius: 20px;
  overflow: hidden;
  background-color: #1a1a1a;
  opacity: ${e=>e.$isVisible?1:0};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: ${e=>e.$isVisible?b:p} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  will-change: transform;
`,l=a.Ay.div`
  width: 100%;
  height: 400px;
  background-image: url(${e=>e.image||"/images/default-scientist.jpg"});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  border-bottom: 5px solid gold;
  transition: background-image 0.3s ease;
`,d=a.Ay.div`
  width: 100%;
  padding: 20px;
  background-color: #3498db;
  color: white;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`,g=a.Ay.h2`
  margin: 0;
  padding: 20px;
  font-size: 28px;
  color: white;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  background-color: #1a1a1a;
`,b=a.i7`
  0% {
    transform: translate(-50%, 100vh) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`,p=a.i7`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 100vh) scale(0.5);
    opacity: 0;
  }
`,u=e=>{let{scientist:t,preloaded:i=!1}=e;const[a,s]=(0,r.useState)(i),o=(0,r.useRef)(null);return(0,r.useEffect)((()=>{if(i||!t.image)return void s(!0);const e=new IntersectionObserver((e=>{e.forEach((e=>{if(e.isIntersecting&&t.image){const e=new Image;e.src=t.image,e.onload=()=>s(!0)}}))}),{threshold:.1});return o.current&&e.observe(o.current),()=>e.disconnect()}),[t.image,i]),(0,n.jsx)(l,{ref:o,image:a&&t.image?t.image:t.thumbnail||"/images/default-scientist.jpg",style:{willChange:"transform, opacity",transition:"background-image 0.3s ease"}})},h=e=>{let{scientist:t,isVisible:i,preloaded:r=!1}=e;const{language:a}=(0,s.o)(),l=(0,o.s)(a);return(0,n.jsxs)(c,{$isVisible:i,style:{willChange:"transform, opacity"},children:[(0,n.jsx)(u,{scientist:t,preloaded:r}),(0,n.jsxs)(d,{color:t.color||"#3498db",children:[l.scientist.subjectPrefix,t.subject||"\u672a\u8bbe\u7f6e\u5b66\u79d1"]}),(0,n.jsx)(g,{children:t.name})]})}}}]);
//# sourceMappingURL=169.138be50a.chunk.js.map