"use strict";(self.webpackChunkthe_center_believer_frontend=self.webpackChunkthe_center_believer_frontend||[]).push([[169],{169:(o,e,r)=>{r.r(e),r.d(e,{default:()=>k});var t=r(43),i=r(464),n=r(539),a=r(579);const l=i.i7`
  0% { border-color: #ff0000; }
  14% { border-color: #ff7f00; }
  28% { border-color: #ffff00; }
  42% { border-color: #00ff00; }
  57% { border-color: #0000ff; }
  71% { border-color: #4b0082; }
  85% { border-color: #9400d3; }
  100% { border-color: #ff0000; }
`,s=i.Ay.div`
  background-color: ${o=>o.$bgColor};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  width: 80%;
  max-width: 500px;
  position: relative;
  z-index: 1002;
  opacity: ${o=>o.$isVisible?1:0};
  transform: ${o=>o.$isVisible?"scale(1)":"scale(0.9)"};
  transition: opacity 0.3s ease, transform 0.3s ease;
  border: 6px solid #ff0000;
  animation: ${l} 5s linear infinite;
`,d=i.i7`
  0% { opacity: 0; }
  100% { opacity: 1; }
`,c=i.Ay.div`
  width: 100%;
  height: 350px;
  background-image: url(${o=>o.$image});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  animation: ${d} 0.5s ease-in-out;
`,p=i.Ay.div`
  padding: 10px 20px;
  background-color: ${o=>o.$bgColor};
`,g=i.Ay.h2`
  margin: 0;
  color: ${o=>o.$textColor};
  font-size: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  text-align: center;
  padding: 5px 0;
`,x=i.Ay.div`
  color: ${o=>o.$textColor};
  padding: 10px 25px;
  display: block;
  margin: 0 auto;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  width: fit-content;
`,b=i.Ay.div`
  padding: 20px 10px 10px 10px;
  background-color: ${o=>o.$bgColor};
  width: 100%;
`,f=i.i7`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`,h=i.Ay.div`
  width: 100%;
  height: 350px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${f} 1.5s infinite linear forwards;
`,u=i.Ay.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`,$=i.Ay.button`
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 10px auto;
  display: block;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #e67e22;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`,m=["#4A90E2","#50E3C2","#F5A623","#D0021B","#9013FE","#417505","#8B572A","#000000"],k=o=>{let{scientist:e,onClose:r,onWorshipComplete:i}=o;const[l,d]=(0,t.useState)(!1),[f,k]=(0,t.useState)(e.image||""),C=e._id||e.name,{bgColor:w,textColor:y}=(0,t.useMemo)((()=>{let o=0;for(let t=0;t<C.length;t++)o=C.charCodeAt(t)+((o<<5)-o);const e=Math.abs(o%m.length),r=m[e];return{bgColor:r,textColor:(o=>{const e=o.replace("#",""),r=parseInt(e.slice(0,2),16),t=255-parseInt(e.slice(2,4),16),i=255-parseInt(e.slice(4,6),16);return`#${(255-r).toString(16).padStart(2,"0")}${t.toString(16).padStart(2,"0")}${i.toString(16).padStart(2,"0")}`})(r)}}),[C]);return(0,t.useEffect)((()=>{if(!e.image)return void d(!0);const o=new Image;o.onload=()=>{d(!0)},o.onerror=()=>{console.log("\u4f7f\u7528\u5907\u7528\u56fe\u7247:",e.fallbackImage),k(e.fallbackImage||"");const o=new Image;o.onload=()=>{d(!0)},o.onerror=()=>{d(!0)},o.src=e.fallbackImage||""},o.src=e.image}),[e.image,e.fallbackImage]),(0,a.jsxs)(s,{$isVisible:!0,$bgColor:w,children:[(0,a.jsx)(u,{onClick:r,children:"\xd7"}),(0,a.jsx)(b,{$bgColor:w,children:(0,a.jsxs)(x,{$textColor:y,$bgColor:`${w}`,children:[(0,a.jsx)(n.j,{text:"\u5b66\u79d1\uff1a"}),(0,a.jsx)(n.j,{text:e.subject||"\u672a\u77e5\u5b66\u79d1"})]})}),l?(0,a.jsx)(c,{$image:f}):(0,a.jsx)(h,{}),(0,a.jsxs)(p,{$bgColor:w,children:[(0,a.jsx)(g,{$textColor:y,children:e.name}),(0,a.jsx)($,{onClick:i,children:(0,a.jsx)(n.j,{text:"\u5d07\u62dc\u8fd9\u4f4d\u79d1\u5b66\u5bb6"})})]})]})}}}]);
//# sourceMappingURL=169.5619a58f.chunk.js.map