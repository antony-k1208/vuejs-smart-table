(function(a,c){typeof exports=="object"&&typeof module!="undefined"?module.exports=c(require("vue-demi")):typeof define=="function"&&define.amd?define(["vue-demi"],c):(a=typeof globalThis!="undefined"?globalThis:a||self,a["vuejs-smart-table"]=c(a.VueDemi))})(this,function(a){"use strict";var c=(t=>(t[t.DESC=-1]="DESC",t[t.NONE=0]="NONE",t[t.ASC=1]="ASC",t))(c||{});function L(t,e){e=e.replace(/\[(\w+)\]/g,".$1"),e=e.replace(/^\./,"");const s=e.split(".");let l=t;for(const n of s)if(n in l)l=l[n];else return;return l}function N(t){return!Array.isArray(t)&&!isNaN(parseFloat(t))&&isFinite(t)}function O(t,e,s,l){return[...t].sort((o,u)=>{if(typeof s=="function")return s(o,u,l);let i,d;if(e?typeof e=="function"?(i=e(o,l),d=e(u,l)):(i=L(o,e),d=L(u,e)):(i=null,d=null),i==null&&(i=""),d==null&&(d=""),N(i)&&N(d))return(i-d)*l;const S=i.toString(),k=d.toString();return S.localeCompare(k)*l})}function q(t){return Array.isArray(t.keys)}function E(t){return t&&typeof t.custom=="function"}function M(t,e){if(E(e)&&!e.custom(e.value,t))return!1;if(!q(e)||e.value===null||e.value===void 0||e.value.length===0)return!0;for(const s of e.keys){const l=L(t,s);if(l!=null){const n=Array.isArray(e.value)?e.value:[e.value];for(const o of n)if(e.exact){if(l.toString()===o.toString())return!0}else if(l.toString().toLowerCase().includes(o.toString().toLowerCase()))return!0}}return!1}function T(t,e){const s=[];for(const l of t){let n=!0;for(const o of Object.keys(e)){const u=e[o];if(!M(l,u)){n=!1;break}}n&&s.push(l)}return s}function V(t,e,s){if(t.length<=e||e<=0||s<=0)return t;const l=(s-1)*e,n=l+e;return[...t].slice(l,n)}function z(t,e){return t<=e?1:Math.ceil(t/e)}function j(){return"_"+Math.random().toString(36).substr(2,9)}class H{constructor(e){this.state=a.reactive({data:[],filters:{},selectedRows:[],selectionMode:"single",selectOnClick:!0,selectedClass:"",hideSortIcons:!1,sortId:null,sortKey:null,customSort:null,sortOrder:c.NONE,currentPage:0,pageSize:void 0,sortIconPosition:"after",sortHeaderClass:""}),this.emit=e,this.filteredData=a.computed(()=>this.state.data.length===0?[]:Object.keys(this.state.filters).length===0?this.state.data:T(this.state.data,this.state.filters)),this.sortedData=a.computed(()=>(this.state.sortKey||this.state.customSort)&&this.state.sortOrder!==0?O(this.filteredData.value,this.state.sortKey,this.state.customSort,this.state.sortOrder):this.filteredData.value),this.totalItems=a.computed(()=>this.filteredData.value.length),this.totalPages=a.computed(()=>this.state.pageSize?z(this.totalItems.value,this.state.pageSize):0),a.watch(this.totalPages,l=>{this.emit("totalPagesChanged",l)},{immediate:!0}),this.paginationEnabled=a.computed(()=>this.state.pageSize);const s=a.computed(()=>this.paginationEnabled.value&&this.state.currentPage>this.totalPages.value);a.watch(s,l=>{l&&this.paginationEnabled.value&&(this.state.currentPage=1,this.emit("update:currentPage",this.state.currentPage))}),this.displayData=a.computed(()=>this.paginationEnabled.value?V(this.sortedData.value,this.state.pageSize,this.state.currentPage):this.sortedData.value),a.watch(this.displayData,l=>{this.emit("totalItemsChanged",l.length)}),this.tableState=a.computed(()=>({rows:this.displayData.value,rowsPrePagination:this.sortedData.value,selectedRows:this.state.selectedRows})),a.watch(this.tableState,l=>{this.emit("stateChanged",l)},{immediate:!0,deep:!0})}revealItem(e){if(!this.paginationEnabled.value)return!1;let s;return typeof e=="function"?s=this.sortedData.value.findIndex(e):s=this.sortedData.value.indexOf(e),s===-1?!1:(this.emit("update:currentPage",Math.ceil((s+1)/this.state.pageSize)),!0)}selectRow(e){if(this.state.selectionMode==="single"){this.state.selectedRows=[e];return}this.state.selectedRows.includes(e)||this.state.selectedRows.push(e)}selectRows(e){for(const s of e)this.selectRow(s)}deselectRow(e){const s=this.state.selectedRows.indexOf(e);s>-1&&this.state.selectedRows.splice(s,1)}deselectRows(e){for(const s of e)this.deselectRow(s)}selectAll(){this.state.selectionMode!=="single"&&(this.state.selectedRows=[...this.state.data])}deselectAll(){this.state.selectedRows=[]}setSort({sortKey:e,customSort:s,sortOrder:l,sortId:n}){this.state.sortKey=e,this.state.customSort=s,this.state.sortOrder=l,this.state.sortId=n}syncProp(e,s,l=!1){a.watch(s,()=>{this.state[e]=s.value},{immediate:!0,deep:l})}}const p=Symbol("store-key");var x=a.defineComponent({name:"VTable",props:{data:{type:Array,required:!0},filters:{type:Object,required:!1,default:()=>({})},currentPage:{type:Number,required:!1,default:void 0},pageSize:{type:Number,required:!1,default:void 0},selectionMode:{type:String,required:!1,default:"single",validator:t=>["single","multiple"].includes(t)},selectedClass:{required:!1,type:String,default:"vt-selected"},selectOnClick:{required:!1,type:Boolean,default:!0},hideSortIcons:{required:!1,type:Boolean,default:!1},sortIconPosition:{required:!1,type:String,default:"after"},sortHeaderClass:{type:String,required:!1,default:""}},emits:{stateChanged:t=>!0,totalPagesChanged:t=>!0,totalItemsChanged:t=>!0},setup(t,e){const s=new H(e.emit);a.provide(p,s),s.syncProp("data",a.toRef(t,"data")),s.syncProp("filters",a.toRef(t,"filters"),!0),s.syncProp("currentPage",a.toRef(t,"currentPage")),s.syncProp("pageSize",a.toRef(t,"pageSize")),s.syncProp("selectionMode",a.toRef(t,"selectionMode")),s.syncProp("selectedClass",a.toRef(t,"selectedClass")),s.syncProp("selectOnClick",a.toRef(t,"selectOnClick")),s.syncProp("hideSortIcons",a.toRef(t,"hideSortIcons")),s.syncProp("sortIconPosition",a.toRef(t,"sortIconPosition")),s.syncProp("sortHeaderClass",a.toRef(t,"sortHeaderClass"));const l=a.computed(()=>s.state.selectedRows.length===s.state.data.length),n=()=>l.value?s.deselectAll():s.selectAll();return{store:s,tableState:s.tableState,allRowsSelected:l,toggleAllRows:n,selectAll:()=>s.selectAll(),deselectAll:()=>s.deselectAll(),selectRows:o=>s.selectRows(o),selectRow:o=>s.selectRow(o),deselectRows:o=>s.deselectRows(o),deselectRow:o=>s.deselectRow(o),revealItem:o=>s.revealItem(o),slots:e.slots}},render(){return a.h("table",{class:"v-table"},[a.h("thead",this.slots.head?this.slots.head({rows:this.tableState.rows,selectedRows:this.tableState.selectedRows,toggleAllRows:this.toggleAllRows,selectAll:this.selectAll,deselectAll:this.deselectAll,allRowsSelected:this.allRowsSelected}):void 0),a.h("tbody",this.slots.body?this.slots.body({rows:this.tableState.rows,selectedRows:this.tableState.selectedRows,selectRow:this.selectRow,deselectRow:this.deselectRow}):void 0),a.h("tfoot",this.slots.foot?this.slots.foot({rows:this.tableState.rows,selectedRows:this.tableState.selectedRows,toggleAllRows:this.toggleAllRows,selectAll:this.selectAll,deselectAll:this.deselectAll,allRowsSelected:this.allRowsSelected}):void 0)])}});function A(t){var l;const e={width:16,height:16,xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${t.vbWidth} ${t.vbHeight}`},s={fill:"currentColor",d:t.d,opacity:(l=t.opacity)!=null?l:1};return a.h("svg",{attrs:e,...e,style:{...t.disabled?{color:"#9CA3AF"}:{}}},[a.h("path",{attrs:s,...s})])}function F(t){const e={width:16,height:16,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"},s=()=>({fill:"currentColor",opacity:t===c.NONE||t===c.ASC?.4:1,d:"M41.05 288.05h238c21.4 0 32.1 25.9 17 41l-119 119a23.9 23.9 0 0 1-33.8.1l-.1-.1-119.1-119c-15.05-15.05-4.4-41 17-41z"}),l=()=>({fill:"currentColor",opacity:t===c.NONE||t===c.DESC?.4:1,d:"M24.05 183.05l119.1-119A23.9 23.9 0 0 1 177 64a.94.94 0 0 1 .1.1l119 119c15.1 15.1 4.4 41-17 41h-238c-21.45-.05-32.1-25.95-17.05-41.05z"});return a.h("svg",{attrs:e,...e},[a.h("g",[a.h("path",{attrs:s(),...s()}),a.h("path",{attrs:l(),...l()})])])}var B=a.defineComponent({name:"VTh",props:{sortKey:{type:[String,Function],required:!1,default:null},customSort:{type:[Function,Object],required:!1,default:null},defaultSort:{type:String,required:!1,validator:t=>["asc","desc",null].includes(t),default:null}},emits:["defaultSort","sortChanged"],setup(t,{emit:e,slots:s}){const l=a.inject(p);if(!t.sortKey&&!t.customSort)throw new Error("Must provide the Sort Key value or a Custom Sort function.");const n=j(),o=a.ref(c.NONE);a.onMounted(()=>{t.defaultSort&&(o.value=t.defaultSort==="desc"?c.DESC:c.ASC,l.setSort({sortOrder:o.value,sortKey:t.sortKey,customSort:t.customSort,sortId:n}),a.nextTick(()=>{e("defaultSort"),e("sortChanged",{sortOrder:o.value})}))});const u=a.computed(()=>{if(!l.state.hideSortIcons)return F(o.value)});a.watch(()=>l.state.sortId,()=>{l.state.sortId!==n&&o.value!==0&&(o.value=0)});const i=()=>{[c.DESC,c.NONE].includes(o.value)?o.value=c.ASC:o.value=c.DESC,l.setSort({sortOrder:o.value,sortKey:t.sortKey,customSort:t.customSort,sortId:n}),e("sortChanged",{sortOrder:o.value})},d=a.computed(()=>{const S=[];return l.state.sortIconPosition==="before"&&!l.state.hideSortIcons&&S.push(u.value),s.default&&S.push(a.h("span",[s.default({sortOrder:o.value})])),l.state.sortIconPosition==="after"&&!l.state.hideSortIcons&&S.push(u.value),S});return()=>a.h("th",{class:"v-th",...a.isVue2?{on:{click:i}}:{onClick:i}},[a.h("div",{class:l.state.sortHeaderClass},d.value)])}}),K=a.defineComponent({name:"VTr",props:{row:{type:Object,required:!0}},setup(t,{slots:e}){const s=a.inject(p),l=a.computed(()=>s.state.selectedRows.find(i=>i===t.row)),n=a.computed(()=>l.value?s.state.selectedClass:""),o=a.computed(()=>({...s.state.selectOnClick?{cursor:"pointer"}:{}})),u=i=>{const d=i.target;d&&d.tagName.toLowerCase()==="td"&&(l.value?s.deselectRow(t.row):s.selectRow(t.row))};return()=>a.h("tr",{class:n.value,style:o.value,...s.state.selectOnClick?{onClick:u}:{},on:{...s.state.selectOnClick?{click:u}:{}}},e.default?e.default({isSelected:l.value,toggle:()=>l.value?s.deselectRow(t.row):s.selectRow(t.row)}):[])}}),W=a.defineComponent({name:"VTPagination",props:{currentPage:{type:Number,required:!0},totalPages:{type:Number,required:!0},hideSinglePage:{required:!1,type:Boolean,default:!0},maxPageLinks:{required:!1,type:Number,default:NaN},boundaryLinks:{required:!1,type:Boolean,default:!1},directionLinks:{required:!1,type:Boolean,default:!0}},setup(t,{slots:e,emit:s}){const l=()=>{const r=[];for(let h=1;h<=t.totalPages;h++)r.push({title:h.toString(),value:h});return r},n=()=>{const r=[],h=Math.ceil(t.totalPages/t.maxPageLinks),f=Math.ceil((t.currentPage||1)/t.maxPageLinks);let g=(f-1)*t.maxPageLinks+1;const v=Math.min(g+t.maxPageLinks-1,t.totalPages),I=v-g+1,C=t.maxPageLinks-I;f===h&&f>1&&C>0&&(g=g-C),f>1&&r.push({title:"...",value:g-1});for(let y=g;y<=v&&!(y>t.totalPages);y++)r.push({title:y.toString(),value:y});return f<h&&r.push({title:"...",value:v+1}),r},o=a.computed(()=>isNaN(t.maxPageLinks)||t.maxPageLinks<=0?l():n()),u=r=>{r<1||r>t.totalPages||r===t.currentPage||s("update:currentPage",r)},i=()=>{t.currentPage?t.currentPage<t.totalPages&&s("update:currentPage",t.currentPage+1):s("update:currentPage",1)},d=()=>{t.currentPage?t.currentPage>1&&s("update:currentPage",t.currentPage-1):s("update:currentPage",1)},S=()=>{s("update:currentPage",1)},k=()=>{s("update:currentPage",t.totalPages)},b=(r,h,f,g=!1)=>a.h("li",{class:["page-item",{disabled:f,active:g}]},[a.h("a",{class:"page-link",style:{...f?{cursor:"not-allowed"}:{}},attrs:{href:"javascript:void(0)"},href:"javascript:void(0)",...f?{}:{onClick:h},on:{...f?{}:{click:h}}},[r])]);return()=>{var h,f,g,v,I,C,m,y;if(t.hideSinglePage&&t.totalPages===1)return a.h("");const r=[];if(t.boundaryLinks){const w=A({vbWidth:512,vbHeight:512,d:"M34.5 239L228.9 44.7c9.4-9.4 24.6-9.4 33.9 0l22.7 22.7c9.4 9.4 9.4 24.5 0 33.9L131.5 256l154 154.7c9.3 9.4 9.3 24.5 0 33.9l-22.7 22.7c-9.4 9.4-24.6 9.4-33.9 0L34.5 273c-9.3-9.4-9.3-24.6 0-34zm192 34l194.3 194.3c9.4 9.4 24.6 9.4 33.9 0l22.7-22.7c9.4-9.4 9.4-24.5 0-33.9L323.5 256l154-154.7c9.3-9.4 9.3-24.5 0-33.9l-22.7-22.7c-9.4-9.4-24.6-9.4-33.9 0L226.5 239c-9.3 9.4-9.3 24.6 0 34z"}),P=t.currentPage===1,R=(f=(h=e.firstPage)==null?void 0:h.call(e,{disabled:P}))!=null?f:w;r.push(b(R,S,P))}if(t.directionLinks){const w=A({vbWidth:320,vbHeight:512,d:"M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"}),P=t.currentPage===1,R=(v=(g=e.previous)==null?void 0:g.call(e,{disabled:P}))!=null?v:w;r.push(b(R,d,P))}for(const w of o.value)r.push(b(w.title,()=>u(w.value),!1,w.value===t.currentPage));if(t.directionLinks){const w=A({vbWidth:320,vbHeight:512,d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"}),P=t.currentPage===t.totalPages,R=(C=(I=e.next)==null?void 0:I.call(e,{disabled:P}))!=null?C:w;r.push(b(R,i,P))}if(t.boundaryLinks){const w=A({vbWidth:512,vbHeight:512,d:"M477.5 273L283.1 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.5 0-33.9l154-154.7-154-154.7c-9.3-9.4-9.3-24.5 0-33.9l22.7-22.7c9.4-9.4 24.6-9.4 33.9 0L477.5 239c9.3 9.4 9.3 24.6 0 34zm-192-34L91.1 44.7c-9.4-9.4-24.6-9.4-33.9 0L34.5 67.4c-9.4 9.4-9.4 24.5 0 33.9l154 154.7-154 154.7c-9.3 9.4-9.3 24.5 0 33.9l22.7 22.7c9.4 9.4 24.6 9.4 33.9 0L285.5 273c9.3-9.4 9.3-24.6 0-34z"}),P=t.currentPage===t.totalPages,R=(y=(m=e.lastPage)==null?void 0:m.call(e,{disabled:P}))!=null?y:w;r.push(b(R,k,P))}return a.h("nav",{class:"vt-pagination"},[a.h("ul",{class:"pagination"},[r])])}}});a.install();var $={install(t,e={}){["hideSortIcons","sortIconPosition","sortHeaderClass"].forEach(l=>{e.hasOwnProperty(l)&&(x.props[l].default=e[l])}),t.component("VTable",x),t.component("VTh",B),t.component("VTr",K),t.component("VTPagination",W)}};return $});
