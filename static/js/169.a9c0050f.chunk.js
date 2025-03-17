"use strict";(self.webpackChunkthe_center_believer_frontend=self.webpackChunkthe_center_believer_frontend||[]).push([[169],{169:(e,i,o)=>{o.r(i),o.d(i,{default:()=>u});var r=o(43),a=o(464),n=o(996),t=o(59),s=o(579);const l=a.Ay.div`
  background-color: white;
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
`,c=a.i7`
  0% { opacity: 0; }
  100% { opacity: 1; }
`,d=a.Ay.div`
  width: 100%;
  height: 350px;
  background-image: url(${e=>e.$image});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  border-bottom: 5px solid gold;
  animation: ${c} 0.5s ease-in-out;
`,p=a.Ay.div`
  padding: 20px;
`,g=a.Ay.h2`
  margin: 0 0 10px 0;
  color: ${e=>e.$color};
  font-size: 24px;
  display: flex;
  align-items: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: ${e=>e.$color};
  }
`,b=a.Ay.div`
  background-color: ${e=>e.$color}22;
  color: ${e=>e.$color};
  padding: 4px 10px;
  border-radius: 15px;
  display: inline-block;
  margin: 10px 0;
  font-size: 14px;
  font-weight: bold;
`,x=a.Ay.p`
  margin: 15px 0;
  line-height: 1.6;
  color: #333;
`,f=a.i7`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`,h=a.Ay.div`
  width: 100%;
  height: 350px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${f} 1.5s infinite linear forwards;
  border-bottom: 5px solid #edeef1;
`,u=e=>{let{scientist:i,isVisible:o,preloaded:a=!1}=e;const{language:c}=(0,n.o)(),f=(0,t.s)(c),[u,m]=(0,r.useState)(a),[$,k]=(0,r.useState)(i.image||"");return(0,r.useEffect)((()=>{if(!i.image||a)return void m(!0);const e=new Image;e.onload=()=>{m(!0)},e.onerror=()=>{console.log("\u4f7f\u7528\u5907\u7528\u56fe\u7247:",i.fallbackImage),k(i.fallbackImage||"");const e=new Image;e.onload=()=>{m(!0)},e.onerror=()=>{m(!0)},e.src=i.fallbackImage||""},e.src=i.image}),[i.image,i.fallbackImage,a]),(0,s.jsxs)(l,{$isVisible:o,children:[u?(0,s.jsx)(d,{$image:$}):(0,s.jsx)(h,{}),(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{$color:i.color||"#3498db",children:i.name}),(0,s.jsxs)(b,{$color:i.color||"#3498db",children:[f.scientist.subjectPrefix," ",i.subject||"\u672a\u77e5\u5b66\u79d1"]}),(0,s.jsx)(x,{children:i.description||"\u6682\u65e0\u63cf\u8ff0"})]})]})}}}]);
//# sourceMappingURL=169.a9c0050f.chunk.js.map