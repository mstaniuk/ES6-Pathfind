!function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(5),u=i(o),r=n(1),h=i(r),l=n(8),d=i(l),c=n(9),f=i(c),p=n(10),v=i(p),y=n(11),m=i(y),g=n(2),k=i(g),b=n(12),w=i(b),P=function(){function t(){a(this,t),this.setCanvas(),this.setGrid(),this.statusManages=new w.default,this.mouse=new d.default(this.canvas,this.statusManages),this.renderer=new f.default(this.ctx),this.updater=new v.default,this.dom={},this.blocksCount=0,this.init(),this.loop()}return s(t,[{key:"setCanvas",value:function(){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=500,this.canvas.height=500,this.canvas.style.border="1px solid black"}},{key:"setGrid",value:function(){this.grid=new h.default(100,100)}},{key:"updateStatus",value:function(){this.dom.mouseStatus.innerHtml=this.states.mouse,this.dom.mouseStatus.pathfindStatus=this.states.mouse}},{key:"getDomElements",value:function(){var t={};return t.app=document.getElementById("app"),t.pathfindButton=document.getElementById("pathfind"),t}},{key:"init",value:function(){var t=this;this.dom=this.getDomElements(),this.dom.app.appendChild(this.canvas);var e=this.grid.getNodeAt(0,0);e.payload.block=new m.default(e.x,e.y,"RGBA(0,255,0,0.5)"),this.updater.push(e.payload.block),this.renderer.push(e.payload.block);var n=this.grid.getNodeAt(99,99);n.payload.block=new m.default(n.x,n.y,"RGBA(0,0,255,0.5)"),this.updater.push(n.payload.block),this.renderer.push(n.payload.block),this.mouse.setOnClickHandler(function(){var e=d.default.pxToNode(t.mouse.x,t.mouse.y);t.grid.getNodeAt(e.x,e.y).payload.isObstacle=!0}),this.mouse.setOnPositionChangeHandler(function(){if(t.mouse.isPressed){var e=d.default.pxToNode(t.mouse.x,t.mouse.y),n=t.grid.getNodeAt(e.x,e.y);if(void 0===n)return;n.payload.isObstacle=!0,void 0===n.payload.block&&(n.payload.block=new m.default(e.x,e.y,"RGBA(255,0,0,0.5)"),t.updater.push(n.payload.block),t.renderer.push(n.payload.block),t.statusManages.renderedBlocksCount=++t.blocksCount)}}),this.dom.pathfindButton.addEventListener("click",function(){t.statusManages.pathfindStatus="Seatching";var e=new u.default(t.grid,new k.default(0,0),new k.default(99,99),t.ctx);e.searchDoneHandler=function(e){t.statusManages.pathfindLastTime=e.getTime()+"ms",t.statusManages.pathfindLastTimeInFrames=parseInt(e.getTime()/5)+"f",!0===e.isPathFound?(t.statusManages.pathfindStatus="Path found",t.renderer.push(e.path)):t.statusManages.pathfindStatus="Path not found"},t.updater.push(e)})}},{key:"loop",value:function(){this.updater.update(),this.renderer.render(),requestAnimationFrame(this.loop.bind(this))}}]),t}();P.nodeSize=5,e.default=P},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.GNode=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=n(0),o=function(t){return t&&t.__esModule?t:{default:t}}(s),u=e.GNode=function t(e,n,a){i(this,t),this.x=e,this.y=n,this.payload=a},r=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:32;i(this,t),this.width=e,this.height=n,this.grid=this._generateGrid()}return a(t,[{key:"_generateGrid",value:function(){for(var t=[],e=0,n=this.width;e<n;e++){t[e]=[];for(var i=0,a=this.height;i<a;i++)t[e][i]=new u(e,i,{isObstacle:!1})}return t}},{key:"getNodeAt",value:function(t,e){if(void 0!==this.grid[t])return this.grid[t][e]}},{key:"setNodeAt",value:function(t,e,n){void 0!==this.getNodeAt(t,e)&&(this.grid[t][e]=n)}},{key:"setPayloadAt",value:function(t,e,n){var i=this.getNodeAt(t,e);void 0!==i&&(i.payload=n)}}],[{key:"nodeRealPosiion",value:function(t,e){return{x:t*o.default.nodeSize,y:e*o.default.nodeSize}}},{key:"nodeRealPositionCenter",value:function(t,e){return{x:t*o.default.nodeSize+o.default.nodeSize/2,y:e*o.default.nodeSize+o.default.nodeSize/2}}}]),t}();e.default=r},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(e,n){i(this,t),this.x=e,this.y=n}return a(t,[{key:"toString",value:function(){return this.x+":"+this.y}}],[{key:"isEqual",value:function(t,e){return t.x===e.x&&t.y===e.y}},{key:"distance",value:function(t,e){return Math.abs(t.x-e.x)+Math.abs(t.y-e.y)}}]),t}();e.default=s},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=e.ListNode=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;i(this,t),this.data=e,this.prev=n,this.next=a},o=function(){function t(){i(this,t),this.length=0,this.head=null,this.tail=null}return a(t,[{key:"clear",value:function(){this.length=0,this.head=null,this.tail=null}},{key:"push",value:function(t){var e=new s(t);return 0===this.length?(this.head=e,this.tail=e):(this.tail.next=e,e.prev=this.tail,this.tail=e),this.length++,e}},{key:"prepend",value:function(t){var e=s(t);return 0===this.length?(this.head=e,this.tail=e):(this.head.prev=e,e.next=this.head,this.head=e),this.length++,e}},{key:"getByIndex",value:function(t){if(t>=0&&t<this.length){if(t<=this.length/2)for(var e=this.head,n=0,i=t;n<i;n++)e=e.next;else for(var e=this.tail,n=this.length,i=t+1;n>i;n--)e=e.prev;return e}return null}},{key:"remove",value:function(t){var e=this.getByIndex(t);if(null!==e)return 0===t&&(this.head=e.next),t===this.length-1&&(this.tail=e.prev),this.node.next=null,this.node.prev=null,this.length--,this}}]),t}();e.default=o},function(t,e,n){"use strict";var i=n(0),a=function(t){return t&&t.__esModule?t:{default:t}}(i);new a.default},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.ANode=void 0;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(2),u=i(o),r=n(6),h=i(r),l=n(7),d=i(l),c=e.ANode=function t(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;a(this,t),this.parent=e,this.point=n,this.f=i,this.g=s,this.id=n.toString()},f=function(){function t(e,n,i){a(this,t),this.grid=e,this.startPoint=n,this.endPoint=i,this.closedList={},this.openList=new h.default(function(t,e){return t.f<e.f}),this.openList.push(new c(null,this.startPoint)),this.isDone=!1,this.isPaused=!1,this.isPathFound=!1,this.path=new d.default,this.time=0,this.onSearchDoneCallback=function(){},this.onSearchPausedCallback=function(){},this.onSearchResumedCallback=function(){},this.validate()}return s(t,[{key:"clear",value:function(){this.closedList={},this.openList=new h.default(function(t,e){return t.f<e.f}),this.openList.push(new c(null,this.startPoint)),this.isDone=!1,this.isPaused=!1,this.isPathFound=!1,this.path=new d.default,this.time=0}},{key:"validate",value:function(){!0===this.grid.getNodeAt(this.startPoint.x,this.startPoint.y).payload.isObstacle&&(this.startPoint=null),!0===this.grid.getNodeAt(this.endPoint.x,this.endPoint.y).payload.isObstacle&&(this.endPoint=null)}},{key:"generateSuccesor",value:function(t,e,n,i,a){var s=new u.default(t,e),o=a.g;o+=0!==n&&0!==i?12:10;var r=10*u.default.distance(s,this.endPoint);return new c(a,s,o+r,o)}},{key:"getSuccessors",value:function(t){for(var e=[],n=-1;n<2;n++)for(var i=-1;i<2;i++)if(0!==n||0!==i){var a=t.point.x+n,s=t.point.y+i,o=this.grid.getNodeAt(a,s);void 0!==o&&!1===o.payload.isObstacle&&e.push(this.generateSuccesor(a,s,n,i,t))}return e}},{key:"isInClosedList",value:function(t){return void 0!==this.closedList[t.id]}},{key:"isInOpenList",value:function(t){var e=this.openList.find(function(e){return e.id===t.id});return null!==e&&(e[1].f>t.f&&this.openList.replace(e[0],t),!0)}},{key:"pause",value:function(){this.isPaused=!0}},{key:"resume",value:function(){this.isPaused=!1}},{key:"search",value:function(t){var e=Date.now();if(!0===this.isDone)return null;if(null===this.startPoint||null===this.endPoint)return this.onPathNotFound(),null;for(;!this.openList.isEmpty();){if(Date.now()-e>5||!0===this.isPaused)return this.time+=Date.now()-e,null;var n=this.openList.first;this.openList.shift();for(var i=this.getSuccessors(n),a=0,s=i.length;a<s;a++){var o=i[a];if(u.default.isEqual(o.point,this.endPoint))return this.onPathFound(o),this.time+=Date.now()-e,o;this.isInOpenList(o,this.openList)||(this.isInClosedList(o)||this.openList.push(o))}this.closedList[n.id]=n}return this.onPathNotFound(),this.time+=Date.now()-e,null}},{key:"onPathFound",value:function(t){this.isDone=!0,this.isPathFound=!0,this.path.fromANode(t),this.onSearchDoneCallback(this)}},{key:"onPathNotFound",value:function(){this.isDone=!0,this.isPathFound=!1,this.onSearchDoneCallback(this)}},{key:"update",value:function(t){this.search(t)}},{key:"getTime",value:function(){return this.time}},{key:"searchDoneHandler",set:function(t){this.onSearchDoneCallback=t}},{key:"searchPausedHandler",set:function(t){this.onSearchPausedCallback=t}},{key:"searchResumedHandler",set:function(t){this.onSearchResumedCallback=t}}]),t}();e.default=f},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.defaultTest;i(this,t),this.heap=[],this.testFunction=e}return a(t,[{key:"toArray",value:function(){return this.heap}},{key:"isEmpty",value:function(){return this.heap.length<=0}},{key:"find",value:function(t){for(var e=0,n=this.heap.length;e<n;e++)if(!0===t(this.heap[e]))return[e,this.heap[e]];return null}},{key:"getParentPosition",value:function(t){return Math.floor(t-1>>1)}},{key:"swap",value:function(t,e){var n=this.heap[t];this.heap[t]=this.heap[e],this.heap[e]=n}},{key:"push",value:function(t){var e=this.heap.length;for(this.heap.push(t);0!==e;){var n=this.getParentPosition(e);if(!0!==this.testFunction(this.heap[e],this.heap[n]))return this.heap;this.swap(n,e),e=n}}},{key:"shift",value:function(){if(1===this.heap.length)return this.heap=[],this.heap;var t=0;for(this.heap[t]=this.heap.pop();;){var e=t;if(2+(e<<1)<this.heap.length==!0?(!1===this.testFunction(this.heap[e],this.heap[1+(e<<1)])&&(t=1+(e<<1)),!1===this.testFunction(this.heap[t],this.heap[2*e+2])&&(t=2+(e<<1))):1+(e<<1)<this.heap.length==!0&&!1===this.testFunction(this.heap[e],this.heap[1+(e<<1)])&&(t=1+(e<<1)),e==t)return this.heap;this.swap(e,t)}}},{key:"replace",value:function(t,e){for(this.heap[t]=e;0!=t;){var n=this.getParentPosition(t);if(!0!==this.testFunction(this.heap[t],this.heap[n]))return this.heap;this.swap(n,t),t=n}}},{key:"first",get:function(){return this.heap[0]}}],[{key:"defaultTest",value:function(t,e){return t<e}}]),t}();e.default=s},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=n(1),o=function(t){return t&&t.__esModule?t:{default:t}}(s),u=function(){function t(){i(this,t),this.path=[]}return a(t,[{key:"fromANode",value:function(t){for(;null!==t.parent;)this.path.push(t.point),t=t.parent;this.path.reverse()}},{key:"render",value:function(t){if(0!==this.path.length){var e=o.default.nodeRealPositionCenter(this.path[0].x,this.path[0].y);t.beginPath(),t.moveTo(e.x,e.y);for(var n=1,i=this.path.length;n<i;n++){var a=o.default.nodeRealPositionCenter(this.path[n].x,this.path[n].y);t.lineTo(a.x,a.y)}t.strokeStyle="blue",t.stroke()}}}]),t}();e.default=u},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=n(0),o=function(t){return t&&t.__esModule?t:{default:t}}(s),u=function(){function t(e,n){i(this,t),this.canvas=e,this.x=0,this.y=0,this.isPressed=!1,this.statusManager=n,this.clickCallback=function(){},this.positionChangeCallback=function(){},this.setEvents()}return a(t,[{key:"setOnClickHandler",value:function(t){this.clickCallback=t}},{key:"setOnPositionChangeHandler",value:function(t){this.positionChangeCallback=t}},{key:"setEvents",value:function(){this.canvas.addEventListener("mousemove",this.onMove.bind(this)),this.canvas.addEventListener("click",this.onClick.bind(this)),this.canvas.addEventListener("mousedown",this.onDown.bind(this)),this.canvas.addEventListener("mouseup",this.onUp.bind(this)),this.canvas.addEventListener("mouseout",this.onOut.bind(this))}},{key:"onDown",value:function(t){this.statusManager.mouseStatus="Down",this.isPressed=!0}},{key:"onUp",value:function(t){this.statusManager.mouseStatus="Up",this.isPressed=!1}},{key:"onOut",value:function(t){this.statusManager.mouseStatus="Up",this.isPressed=!1}},{key:"onMove",value:function(t){var e=this.canvas.getBoundingClientRect(),n=Math.floor(t.clientX-e.left),i=Math.floor(t.clientY-e.top);n!==this.x&&(this.positionChangeCallback(t),this.x=n),i!==this.y&&(this.positionChangeCallback(t),this.y=i)}},{key:"onClick",value:function(t){this.clickCallback(t)}}],[{key:"pxToNode",value:function(t,e){return{x:Math.floor(t/o.default.nodeSize),y:Math.floor(e/o.default.nodeSize)}}}]),t}();e.default=u},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=n(3),o=function(t){return t&&t.__esModule?t:{default:t}}(s),u=function(){function t(e){i(this,t),this.ctx=e,this.queue=new o.default}return a(t,[{key:"push",value:function(t){if(void 0===t.render)throw new Error('Rendered item have to have "render" method');this.queue.push(t)}},{key:"beforeRender",value:function(){this.ctx.clearRect(0,0,500,500)}},{key:"render",value:function(){this.beforeRender();for(var t=this.queue.head;null!==t;)t.data.render(this.ctx),t=t.next}}]),t}();e.default=u},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=n(3),o=function(t){return t&&t.__esModule?t:{default:t}}(s),u=function(){function t(){i(this,t),this.lastTime=Date.now(),this.dt=0,this.queue=new o.default}return a(t,[{key:"push",value:function(t){if(void 0===t.update)throw new Error('Updated item have to have "update" method');this.queue.push(t)}},{key:"beforeUpdate",value:function(){var t=Date.now();this.dt=t-this.lastTime,this.lastTime=t}},{key:"update",value:function(){this.beforeUpdate();for(var t=this.queue.head;null!==t;)!0!==t.data.isDone&&t.data.update(this.dt),t=t.next}}]),t}();e.default=u},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(0),u=i(o),r=n(1),h=i(r),l=function(){function t(e,n,i){a(this,t),this.x=e,this.y=n,this.style=i,this.scale=2.5,this.idDone=!1}return s(t,[{key:"update",value:function(t){this.scale-=t/200,this.scale<=1&&(this.scale=1,this.isDone=!0)}},{key:"render",value:function(t){t.fillStyle=this.style;var e=u.default.nodeSize*this.scale,n=h.default.nodeRealPosiion(this.x,this.y);n.x=n.x-(e-u.default.nodeSize)/2,n.y=n.y-(e-u.default.nodeSize)/2,t.fillRect(n.x,n.y,e,e)}}]),t}();e.default=l},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(){i(this,t),this.dom={root:document.getElementById("summary"),mouseStatus:document.getElementById("mouseStatus"),pathfindStatus:document.getElementById("pathfindStatus"),pathfindLastTime:document.getElementById("pathfindLastTime"),pathfindLastTimeInFrames:document.getElementById("pathfindLastTimeInFrames"),renderedObjectsCount:document.getElementById("renderedObjectsCount"),renderedBlocksCount:document.getElementById("renderedBlocksCount")},this.resetAll()}return a(t,[{key:"resetAll",value:function(){this.mouseStatus="Idle",this.pathfindStatus="Idle",this.pathfindLastTime="0ms",this.pathfindLastTimeInFrames="0f",this.renderedObjectsCount="0",this.renderedBlocks="0"}},{key:"mouseStatus",get:function(){return this.dom.mouseStatus.innerHTML},set:function(t){this.dom.mouseStatus.innerHTML=t}},{key:"pathfindStatus",get:function(){return this.dom.pathfindStatus.innerHTML},set:function(t){this.dom.pathfindStatus.innerHTML=t}},{key:"pathfindLastTime",get:function(){return this.dom.pathfindLastTime.innerHTML},set:function(t){this.dom.pathfindLastTime.innerHTML=t}},{key:"pathfindLastTimeInFrames",get:function(){return this.dom.pathfindLastTimeInFrames.innerHTML},set:function(t){this.dom.pathfindLastTimeInFrames.innerHTML=t}},{key:"renderedBlocksCount",get:function(){return this.dom.renderedBlocksCount.innerHTML},set:function(t){this.dom.renderedBlocksCount.innerHTML=t}}]),t}();e.default=s}]);
//# sourceMappingURL=main.js.map