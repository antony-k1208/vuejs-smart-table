var __defProp=Object.defineProperty,__hasOwnProp=Object.prototype.hasOwnProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,s)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,__assign=(e,t)=>{for(var s in t||(t={}))__hasOwnProp.call(t,s)&&__defNormalProp(e,s,t[s]);if(__getOwnPropSymbols)for(var s of __getOwnPropSymbols(t))__propIsEnum.call(t,s)&&__defNormalProp(e,s,t[s]);return e};!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue-demi")):"function"==typeof define&&define.amd?define(["exports","vue-demi"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["vuejs-smart-table"]={},e.VueDemi)}(this,(function(e,t){"use strict";var s;function o(e,t){const s=(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split(".");let o=e;for(const r of s){if(!(r in o))return;o=o[r]}return o}function r(e){return!Array.isArray(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function a(e,t){if(function(e){return e&&"function"==typeof e.custom}(t)&&!t.custom(t.value,e))return!1;if(!function(e){return Array.isArray(e.keys)}(t)||null===t.value||void 0===t.value||0===t.value.length)return!0;for(const s of t.keys){const r=o(e,s);if(null!=r){const e=Array.isArray(t.value)?t.value:[t.value];for(const s of e)if(t.exact){if(r.toString()===s.toString())return!0}else if(r.toString().toLowerCase().includes(s.toString().toLowerCase()))return!0}}return!1}e.SortOrder=void 0,(s=e.SortOrder||(e.SortOrder={}))[s.DESC=-1]="DESC",s[s.NONE=0]="NONE",s[s.ASC=1]="ASC";class l{constructor(s){this.state=t.reactive({data:[],filters:{},selectedRows:[],selectionMode:"single",selectOnClick:!0,selectedClass:"",hideSortIcons:!1,sortId:null,sortKey:null,customSort:null,sortOrder:e.SortOrder.NONE,currentPage:0,pageSize:void 0,sortIconPosition:"after",sortHeaderClass:"",headlessMode:!1}),this.emit=s,this.filteredData=t.computed((()=>0===this.state.data.length?[]:0===Object.keys(this.state.filters).length?this.state.data:function(e,t){const s=[];for(const o of e){let e=!0;for(const s of Object.keys(t))if(!a(o,t[s])){e=!1;break}e&&s.push(o)}return s}(this.state.data,this.state.filters))),this.sortedData=t.computed((()=>{return(this.state.sortKey||this.state.customSort)&&0!==this.state.sortOrder?(e=this.filteredData.value,t=this.state.sortKey,s=this.state.customSort,a=this.state.sortOrder,[...e].sort(((e,l)=>{if("function"==typeof s)return s(e,l,a);let i,n;if(t?"function"==typeof t?(i=t(e,a),n=t(l,a)):(i=o(e,t),n=o(l,t)):(i=null,n=null),null==i&&(i=""),null==n&&(n=""),r(i)&&r(n))return(i-n)*a;const c=i.toString(),d=n.toString();return c.localeCompare(d)*a}))):this.filteredData.value;var e,t,s,a})),this.totalItems=t.computed((()=>this.filteredData.value.length)),this.totalPages=t.computed((()=>{return this.state.pageSize?(e=this.totalItems.value,t=this.state.pageSize,e<=t?1:Math.ceil(e/t)):0;var e,t})),t.watch(this.totalPages,(e=>{this.emit("totalPagesChanged",e)}),{immediate:!0}),this.paginationEnabled=t.computed((()=>this.state.pageSize));const l=t.computed((()=>this.paginationEnabled.value&&this.state.currentPage>this.totalPages.value));t.watch(l,(e=>{e&&this.paginationEnabled.value&&(this.state.currentPage=1,this.emit("update:currentPage",this.state.currentPage))})),this.displayData=t.computed((()=>this.paginationEnabled.value?function(e,t,s){if(e.length<=t||t<=0||s<=0)return e;const o=(s-1)*t,r=o+t;return[...e].slice(o,r)}(this.sortedData.value,this.state.pageSize,this.state.currentPage):this.sortedData.value)),t.watch(this.displayData,(e=>{this.emit("totalItemsChanged",e.length)})),this.tableState=t.computed((()=>({rows:this.displayData.value,rowsPrePagination:this.sortedData.value,selectedRows:this.state.selectedRows}))),t.watch(this.tableState,(e=>{this.emit("stateChanged",e)}),{immediate:!0,deep:!0})}revealItem(e){if(!this.paginationEnabled.value)return!1;let t;return t="function"==typeof e?this.sortedData.value.findIndex(e):this.sortedData.value.indexOf(e),-1!==t&&(this.emit("update:currentPage",Math.ceil((t+1)/this.state.pageSize)),!0)}selectRow(e){"single"!==this.state.selectionMode?this.state.selectedRows.includes(e)||this.state.selectedRows.push(e):this.state.selectedRows=[e]}selectRows(e){for(const t of e)this.selectRow(t)}deselectRow(e){const t=this.state.selectedRows.indexOf(e);t>-1&&this.state.selectedRows.splice(t,1)}deselectRows(e){for(const t of e)this.deselectRow(t)}selectAll(){"single"!==this.state.selectionMode&&(this.state.selectedRows=[...this.state.data])}deselectAll(){this.state.selectedRows=[]}setSort({sortKey:e,customSort:t,sortOrder:s,sortId:o}){this.state.sortKey=e,this.state.customSort=t,this.state.sortOrder=s,this.state.sortId=o}syncProp(e,s,o=!1){t.watch(s,(()=>{this.state[e]=s.value}),{immediate:!0,deep:o})}}const i=Symbol("store-key");var n=t.defineComponent({name:"VTable",props:{data:{type:Array,required:!0},filters:{type:Object,required:!1,default:()=>({})},currentPage:{type:Number,required:!1,default:void 0},pageSize:{type:Number,required:!1,default:void 0},selectionMode:{type:String,required:!1,default:"single",validator:e=>["single","multiple"].includes(e)},selectedClass:{required:!1,type:String,default:"vt-selected"},selectOnClick:{required:!1,type:Boolean,default:!0},hideSortIcons:{required:!1,type:Boolean,default:!1},sortIconPosition:{required:!1,type:String,default:"after"},sortHeaderClass:{type:String,required:!1,default:""},headlessMode:{type:Boolean,required:!1,default:!1}},emits:{stateChanged:e=>!0,totalPagesChanged:e=>!0,totalItemsChanged:e=>!0},setup(e,s){const o=new l(s.emit);t.provide(i,o),o.syncProp("data",t.toRef(e,"data")),o.syncProp("filters",t.toRef(e,"filters"),!0),o.syncProp("currentPage",t.toRef(e,"currentPage")),o.syncProp("pageSize",t.toRef(e,"pageSize")),o.syncProp("selectionMode",t.toRef(e,"selectionMode")),o.syncProp("selectedClass",t.toRef(e,"selectedClass")),o.syncProp("selectOnClick",t.toRef(e,"selectOnClick")),o.syncProp("hideSortIcons",t.toRef(e,"hideSortIcons")),o.syncProp("sortIconPosition",t.toRef(e,"sortIconPosition")),o.syncProp("sortHeaderClass",t.toRef(e,"sortHeaderClass")),o.syncProp("headlessMode",t.toRef(e,"headlessMode"));const r=t.computed((()=>o.state.selectedRows.length===o.state.data.length));return{store:o,tableState:o.tableState,allRowsSelected:r,toggleAllRows:()=>r.value?o.deselectAll():o.selectAll(),selectAll:()=>o.selectAll(),deselectAll:()=>o.deselectAll(),selectRows:e=>o.selectRows(e),selectRow:e=>o.selectRow(e),deselectRows:e=>o.deselectRows(e),deselectRow:e=>o.deselectRow(e),revealItem:e=>o.revealItem(e),slots:s.slots}},render(){return t.h("table",{class:"v-table"},[t.h("thead",this.slots.head?this.slots.head({rows:this.tableState.rows,selectedRows:this.tableState.selectedRows,toggleAllRows:this.toggleAllRows,selectAll:this.selectAll,deselectAll:this.deselectAll,allRowsSelected:this.allRowsSelected}):void 0),t.h("tbody",this.slots.body?this.slots.body({rows:this.tableState.rows,selectedRows:this.tableState.selectedRows,selectRow:this.selectRow,deselectRow:this.deselectRow}):void 0),t.h("tfoot",this.slots.foot?this.slots.foot({rows:this.tableState.rows,selectedRows:this.tableState.selectedRows,toggleAllRows:this.toggleAllRows,selectAll:this.selectAll,deselectAll:this.deselectAll,allRowsSelected:this.allRowsSelected}):void 0)])}});function c(e){var s;const o={width:16,height:16,xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${e.vbWidth} ${e.vbHeight}`},r={fill:"currentColor",d:e.d,opacity:null!=(s=e.opacity)?s:1};return t.h("svg",__assign(__assign({attrs:o},o),{style:__assign({},e.disabled?{color:"#9CA3AF"}:{})}),[t.h("path",__assign({attrs:r},r))])}var d=t.defineComponent({name:"VTh",props:{sortKey:{type:[String,Function],required:!1,default:null},customSort:{type:[Function,Object],required:!1,default:null},defaultSort:{type:String,required:!1,validator:e=>["asc","desc",null].includes(e),default:null}},emits:["defaultSort","sortChanged"],setup(s,{emit:o,slots:r}){const a=t.inject(i);if(!s.sortKey&&!s.customSort)throw new Error("Must provide the Sort Key value or a Custom Sort function.");const l="_"+Math.random().toString(36).substr(2,9),n=t.ref(e.SortOrder.NONE);t.onMounted((()=>{s.defaultSort&&(n.value="desc"===s.defaultSort?e.SortOrder.DESC:e.SortOrder.ASC,a.setSort({sortOrder:n.value,sortKey:s.sortKey,customSort:s.customSort,sortId:l}),t.nextTick((()=>{o("defaultSort"),o("sortChanged",{sortOrder:n.value})})))}));const c=t.computed((()=>{if(!a.state.hideSortIcons)return function(s){const o={width:16,height:16,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"},r=()=>({fill:"currentColor",opacity:s===e.SortOrder.NONE||s===e.SortOrder.ASC?.4:1,d:"M41.05 288.05h238c21.4 0 32.1 25.9 17 41l-119 119a23.9 23.9 0 0 1-33.8.1l-.1-.1-119.1-119c-15.05-15.05-4.4-41 17-41z"}),a=()=>({fill:"currentColor",opacity:s===e.SortOrder.NONE||s===e.SortOrder.DESC?.4:1,d:"M24.05 183.05l119.1-119A23.9 23.9 0 0 1 177 64a.94.94 0 0 1 .1.1l119 119c15.1 15.1 4.4 41-17 41h-238c-21.45-.05-32.1-25.95-17.05-41.05z"});return t.h("svg",__assign({attrs:o},o),[t.h("g",[t.h("path",__assign({attrs:r()},r())),t.h("path",__assign({attrs:a()},a()))])])}(n.value)}));t.watch((()=>a.state.sortId),(()=>{a.state.sortId!==l&&0!==n.value&&(n.value=0)}));const d=()=>{[e.SortOrder.DESC,e.SortOrder.NONE].includes(n.value)?n.value=e.SortOrder.ASC:n.value=e.SortOrder.DESC,a.setSort({sortOrder:n.value,sortKey:s.sortKey,customSort:s.customSort,sortId:l}),o("sortChanged",{sortOrder:n.value})},u=t.computed((()=>{const e=[];return"before"!==a.state.sortIconPosition||a.state.hideSortIcons||e.push(c.value),r.default&&e.push(t.h("span",[r.default({sortOrder:n.value})])),"after"!==a.state.sortIconPosition||a.state.hideSortIcons||e.push(c.value),e}));return()=>t.h("th",__assign({class:"v-th"},t.isVue2?{on:{click:d}}:{onClick:d}),[t.h("div",{class:a.state.sortHeaderClass},u.value)])}}),u=t.defineComponent({name:"VTr",props:{row:{type:Object,required:!0}},inheritAttrs:!1,setup(e,{slots:s}){const o=t.inject(i),r=t.useAttrs(),a=t.computed((()=>o.state.selectedRows.find((t=>t===e.row)))),l=t.computed((()=>a.value?o.state.selectedClass:"")),n=t.computed((()=>__assign({},o.state.selectOnClick?{cursor:"pointer"}:{}))),c=t=>{const s=t.target;s&&"td"===s.tagName.toLowerCase()&&(a.value?o.deselectRow(e.row):o.selectRow(e.row))};return()=>t.h("tr",__assign(__assign({class:l.value,style:n.value},o.state.selectOnClick?__assign({},t.isVue2?{on:{click:c}}:{onClick:c}):{}),r),s.default?s.default({isSelected:a.value,toggle:()=>a.value?o.deselectRow(e.row):o.selectRow(e.row)}):[])}}),h=t.defineComponent({name:"VTPagination",props:{currentPage:{type:Number,required:!0},totalPages:{type:Number,required:!0},hideSinglePage:{required:!1,type:Boolean,default:!0},maxPageLinks:{required:!1,type:Number,default:NaN},boundaryLinks:{required:!1,type:Boolean,default:!1},directionLinks:{required:!1,type:Boolean,default:!0}},setup(e,{slots:s,emit:o}){const r=t.computed((()=>isNaN(e.maxPageLinks)||e.maxPageLinks<=0?(()=>{const t=[];for(let s=1;s<=e.totalPages;s++)t.push({title:s.toString(),value:s});return t})():(()=>{const t=[],s=Math.ceil(e.totalPages/e.maxPageLinks),o=Math.ceil((e.currentPage||1)/e.maxPageLinks);let r=(o-1)*e.maxPageLinks+1;const a=Math.min(r+e.maxPageLinks-1,e.totalPages),l=a-r+1,i=e.maxPageLinks-l;o===s&&o>1&&i>0&&(r-=i),o>1&&t.push({title:"...",value:r-1});for(let n=r;n<=a&&!(n>e.totalPages);n++)t.push({title:n.toString(),value:n});return o<s&&t.push({title:"...",value:a+1}),t})())),a=t=>{t<1||t>e.totalPages||t===e.currentPage||o("update:currentPage",t)},l=()=>{e.currentPage?e.currentPage<e.totalPages&&o("update:currentPage",e.currentPage+1):o("update:currentPage",1)},i=()=>{e.currentPage?e.currentPage>1&&o("update:currentPage",e.currentPage-1):o("update:currentPage",1)},n=()=>{o("update:currentPage",1)},d=()=>{o("update:currentPage",e.totalPages)},u=(e,s,o,r=!1)=>t.h("li",{class:["page-item",{disabled:o,active:r}]},[t.h("a",__assign(__assign({class:"page-link",style:__assign({},o?{cursor:"not-allowed"}:{}),attrs:{href:"javascript:void(0)"},href:"javascript:void(0)"},o?{}:{onClick:s}),{on:__assign({},o?{}:{click:s})}),[e])]);return()=>{var o,h,p,g,f,v,m,S;if(e.hideSinglePage&&1===e.totalPages)return t.h("");const w=[];if(e.boundaryLinks){const t=c({vbWidth:512,vbHeight:512,d:"M34.5 239L228.9 44.7c9.4-9.4 24.6-9.4 33.9 0l22.7 22.7c9.4 9.4 9.4 24.5 0 33.9L131.5 256l154 154.7c9.3 9.4 9.3 24.5 0 33.9l-22.7 22.7c-9.4 9.4-24.6 9.4-33.9 0L34.5 273c-9.3-9.4-9.3-24.6 0-34zm192 34l194.3 194.3c9.4 9.4 24.6 9.4 33.9 0l22.7-22.7c9.4-9.4 9.4-24.5 0-33.9L323.5 256l154-154.7c9.3-9.4 9.3-24.5 0-33.9l-22.7-22.7c-9.4-9.4-24.6-9.4-33.9 0L226.5 239c-9.3 9.4-9.3 24.6 0 34z"}),r=1===e.currentPage,a=null!=(h=null==(o=s.firstPage)?void 0:o.call(s,{disabled:r}))?h:t;w.push(u(a,n,r))}if(e.directionLinks){const t=c({vbWidth:320,vbHeight:512,d:"M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"}),o=1===e.currentPage,r=null!=(g=null==(p=s.previous)?void 0:p.call(s,{disabled:o}))?g:t;w.push(u(r,i,o))}for(const t of r.value)w.push(u(t.title,(()=>a(t.value)),!1,t.value===e.currentPage));if(e.directionLinks){const t=c({vbWidth:320,vbHeight:512,d:"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"}),o=e.currentPage===e.totalPages,r=null!=(v=null==(f=s.next)?void 0:f.call(s,{disabled:o}))?v:t;w.push(u(r,l,o))}if(e.boundaryLinks){const t=c({vbWidth:512,vbHeight:512,d:"M477.5 273L283.1 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.5 0-33.9l154-154.7-154-154.7c-9.3-9.4-9.3-24.5 0-33.9l22.7-22.7c9.4-9.4 24.6-9.4 33.9 0L477.5 239c9.3 9.4 9.3 24.6 0 34zm-192-34L91.1 44.7c-9.4-9.4-24.6-9.4-33.9 0L34.5 67.4c-9.4 9.4-9.4 24.5 0 33.9l154 154.7-154 154.7c-9.3 9.4-9.3 24.5 0 33.9l22.7 22.7c9.4 9.4 24.6 9.4 33.9 0L285.5 273c9.3-9.4 9.3-24.6 0-34z"}),o=e.currentPage===e.totalPages,r=null!=(S=null==(m=s.lastPage)?void 0:m.call(s,{disabled:o}))?S:t;w.push(u(r,d,o))}return t.h("nav",{class:"vt-pagination"},[t.h("ul",{class:"pagination"},[w])])}}});t.install();var p={install(e,t={}){["hideSortIcons","sortIconPosition","sortHeaderClass"].forEach((e=>{t.hasOwnProperty(e)&&(n.props[e].default=t[e])})),e.component("VTable",n),e.component("VTh",d),e.component("VTr",u),e.component("VTPagination",h)}};e.default=p,e.storeKey=i,Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module"}));
