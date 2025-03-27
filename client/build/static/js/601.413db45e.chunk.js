"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[601],{641:(s,e,a)=>{a.d(e,{A:()=>o});a(5043);var n=a(9882),l=a(9456),i=a(6462),t=a(2145),c=a(3780),d=a(579);const o=()=>{const{user:s}=(0,l.d4)((s=>s.auth)),e=(0,l.wA)(),a=(0,i.Zp)(),o=s=>{let{closeToast:e}=s;return(0,d.jsxs)("div",{children:[(0,d.jsx)("button",{className:"btn btn-sm btn-danger me-2",onClick:()=>{r(!0),e()},children:"Yes"}),(0,d.jsx)("button",{className:"btn btn-sm btn-secondary",onClick:e,children:"No"})]})},r=s=>{s?(e((0,c.r)()),t.oR.success("Logged out successfully!"),a("/login")):t.oR.dismiss()};return(0,d.jsx)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light shadow-sm p-2",children:(0,d.jsxs)("div",{className:"container-fluid d-flex justify-content-between align-items-center",children:[(0,d.jsxs)("div",{className:"navbar-brand d-flex align-items-center",children:[(0,d.jsx)(n.jD9,{color:"red",size:28,className:"me-2"}),(0,d.jsx)("span",{className:"fw-bold",children:"Blood Bank App"})]}),(0,d.jsxs)("ul",{className:"navbar-nav d-flex align-items-center",children:[(0,d.jsx)("li",{className:"nav-item mx-3",children:(0,d.jsxs)("span",{className:"nav-link d-flex align-items-center",children:[(0,d.jsx)(n.Z31,{size:22,className:"me-1"}),(null===s||void 0===s?void 0:s.name)||(null===s||void 0===s?void 0:s.hospitalName)," \xa0",(0,d.jsx)("span",{className:"badge bg-secondary",children:null===s||void 0===s?void 0:s.role})]})}),(0,d.jsx)("li",{className:"nav-item mx-3",children:(0,d.jsx)(i.N_,{to:"/",className:"nav-link",children:"Home"})}),(0,d.jsx)("li",{className:"nav-item mx-3",children:(0,d.jsx)("button",{className:"btn btn-danger",onClick:()=>{t.oR.warn("Are you sure you want to logout?",{position:"top-center",autoClose:!1,closeOnClick:!1,draggable:!1,closeButton:s=>(0,d.jsx)(o,{...s})})},children:"Logout"})})]})]})})}},4601:(s,e,a)=>{a.r(e),a.d(e,{default:()=>r});var n=a(5043),l=a(9285),i=a(6178),t=a.n(i),c=a(406),d=a(2145),o=(a(2342),a(579));const r=()=>{const[s,e]=(0,n.useState)([]);(0,n.useEffect)((()=>{(async()=>{try{const{data:s}=await c.A.get("/admin/hospital-list");null!==s&&void 0!==s&&s.success&&e(null===s||void 0===s?void 0:s.hospitalData)}catch(s){console.log(s)}})()}),[]);return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(l.A,{children:[(0,o.jsx)(d.N9,{}),(0,o.jsxs)("table",{className:"table ",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{scope:"col",children:"Name"}),(0,o.jsx)("th",{scope:"col",children:"Email"}),(0,o.jsx)("th",{scope:"col",children:"Phone"}),(0,o.jsx)("th",{scope:"col",children:"Address"}),(0,o.jsx)("th",{scope:"col",children:"Date & Time"}),(0,o.jsx)("th",{scope:"col",children:"Action"})]})}),(0,o.jsx)("tbody",{className:!0,children:null===s||void 0===s?void 0:s.map((s=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:s.hospitalName}),(0,o.jsx)("td",{children:s.email}),(0,o.jsx)("td",{children:s.phone}),(0,o.jsx)("td",{children:s.address}),(0,o.jsx)("td",{children:t()(s.createdAt).format("DD/MM/YYYY hh:mm A")}),(0,o.jsx)("td",{children:(0,o.jsx)("button",{className:"btn btn-danger mb-2",onClick:()=>(async s=>{try{if(!window.prompt("Are you sure you want to delete this hospital?","Sure"))return;const{data:e}=await c.A.delete(`/admin/delete-hospital/${s}`);(0,d.oR)(null===e||void 0===e?void 0:e.message),window.location.reload()}catch(e){console.log(e)}})(s._id),children:(0,o.jsx)("i",{className:"fa-solid fa-trash-can"})})})]},s._id)))})]})]})})}},9285:(s,e,a)=>{a.d(e,{A:()=>d});a(5043);var n=a(641),l=a(9456),i=a(6462),t=a(579);const c=()=>{const s=(0,i.zy)(),{user:e}=(0,l.d4)((s=>s.auth));return(0,t.jsx)("div",{className:"sidebar",children:(0,t.jsx)("div",{className:"menu",children:({donor:[{path:"/donation",name:"Donation",icon:"fa-solid fa-hand-holding-medical"}],hospital:[{path:"/consumer",name:"Consumer",icon:"fa-solid fa-hospital"}],admin:[{path:"/donor-list",name:"Donor List",icon:"fa-solid fa-hand-holding-medical"},{path:"/hospital-list",name:"Hospital List",icon:"fa-solid fa-hospital"}]}[null===e||void 0===e?void 0:e.role]||[]).map((e=>(0,t.jsxs)("div",{className:"menu-item "+(s.pathname===e.path?"active":""),children:[(0,t.jsx)("i",{className:e.icon}),(0,t.jsx)(i.N_,{to:e.path,children:e.name})]},e.path)))})})},d=s=>{let{children:e}=s;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"header fixed-top shadow-sm bg-light",children:(0,t.jsx)(n.A,{})}),(0,t.jsxs)("div",{className:"d-flex",children:[(0,t.jsx)("div",{className:"sidebar",children:(0,t.jsx)(c,{})}),(0,t.jsx)("div",{className:"content col-md-9",children:e})]})]})}}}]);
//# sourceMappingURL=601.413db45e.chunk.js.map