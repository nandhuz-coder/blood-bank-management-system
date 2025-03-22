"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[651],{641:(e,s,l)=>{l.d(s,{A:()=>d});l(5043);var a=l(9882),n=l(8298),t=l(3216),c=l(5475),o=l(2145),i=l(579);const d=()=>{const{user:e}=(0,n.d4)((e=>e.auth)),s=(0,t.Zp)(),l=(0,t.zy)();return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("nav",{className:"navbar ",children:(0,i.jsxs)("div",{className:"container-fluid",children:[(0,i.jsxs)("div",{className:"navbar-brand",children:[(0,i.jsx)(a.jD9,{color:"red"})," Blood Bank App"]}),(0,i.jsxs)("ul",{className:"navbar-nav flex-row",children:[(0,i.jsx)("li",{className:"nav-item mx-3",children:(0,i.jsxs)("p",{className:"nav-link",children:[(0,i.jsx)(a.Z31,{})," ",(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.hospitalName)||(null===e||void 0===e?void 0:e.organisationName)," "," "," \xa0",(0,i.jsx)("span",{class:"badge bg-secondary",children:null===e||void 0===e?void 0:e.role})]})}),"organisation"!==(null===e||void 0===e?void 0:e.role)||"/"!==l.pathname&&"/donor"!==l.pathname&&"/hospital"!==l.pathname?(0,i.jsx)("li",{className:"nav-item mx-3 mt-2",children:(0,i.jsx)(c.N_,{to:"/",className:"nav-link",children:"Home"})}):(0,i.jsx)("li",{className:"nav-item mx-3 mt-2",children:(0,i.jsx)(c.N_,{to:"/analytics",className:"nav-link",children:"Analytics"})}),(0,i.jsx)("li",{className:"nav-item mx-3 ",children:(0,i.jsx)("button",{className:"btn btn-danger",onClick:()=>{window.prompt("Are you sure you want to Logout?","Sure")&&(localStorage.clear(),o.oR.success("Logout Successfully"),s("/login"))},children:"Logout"})})]})]})})})}},2032:(e,s,l)=>{l.r(s),l.d(s,{default:()=>d});var a=l(5043),n=l(641),t=l(406),c=l(6178),o=l.n(c),i=l(579);const d=()=>{const[e,s]=(0,a.useState)([]),l=["#A0BFE0","#7895CB","#F2EAD3","#A2CDB0","#FF8551","#FFDEDE","#A2FF86","#E1ECC8"],[c,d]=(0,a.useState)([]);(0,a.useEffect)((()=>{(async()=>{try{const{data:e}=await t.A.get("/analytics/bloodGroups-data");null!==e&&void 0!==e&&e.success&&s(null===e||void 0===e?void 0:e.bloodGroupData)}catch(e){console.log(e)}})()}),[]);return(0,a.useEffect)((()=>{(async()=>{try{const{data:e}=await t.A.get("/inventory/get-recent-inventory");null!==e&&void 0!==e&&e.success&&d(null===e||void 0===e?void 0:e.inventory)}catch(e){console.log(e)}})()}),[]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.A,{}),(0,i.jsx)("div",{className:"d-flex flex-row flex-wrap",children:null===e||void 0===e?void 0:e.map(((e,s)=>(0,i.jsxs)("div",{className:"card m-4 p-1",style:{width:"20rem",backgroundColor:`${l[s]}`},children:[(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsx)("h1",{className:"card-title bg-light text-dark text-center",children:e.bloodGroup}),(0,i.jsxs)("p",{className:"card-text",children:["Total In: ",(0,i.jsx)("b",{children:e.totalIn})," (ML)"]}),(0,i.jsxs)("p",{className:"card-text",children:["Total Out: ",(0,i.jsx)("b",{children:e.totalOut})," (ML)"]})]}),(0,i.jsxs)("div",{className:"card-footer text-light bg-dark text-center",children:["Total available:",(0,i.jsx)("b",{children:e.availableBlood})," (ML)"]})]},s)))}),(0,i.jsxs)("div",{className:"container mt-3",children:[(0,i.jsx)("h1",{className:"my-3",children:"Recent Blood Transactions"}),(0,i.jsxs)("table",{className:"table  ",children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"col",children:"Blood Group"}),(0,i.jsx)("th",{scope:"col",children:"Inventory Type"}),(0,i.jsx)("th",{scope:"col",children:"Quantity"}),(0,i.jsx)("th",{scope:"col",children:"Email"}),(0,i.jsx)("th",{scope:"col",children:"Date & Time"})]})}),(0,i.jsx)("tbody",{children:null===c||void 0===c?void 0:c.map((e=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:e.bloodGroup}),(0,i.jsx)("td",{children:e.inventoryType}),(0,i.jsxs)("td",{children:[e.quantity," (ML)"]}),(0,i.jsx)("td",{children:e.email}),(0,i.jsx)("td",{children:o()(e.createdAt).format("DD/MM/YYYY hh:mm A")})]},e._id)))})]})]})]})}}}]);
//# sourceMappingURL=651.ccaf0943.chunk.js.map