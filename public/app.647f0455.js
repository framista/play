parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vZyd":[function(require,module,exports) {
function e(e){return r(e)||n(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function n(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function r(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var i=document.querySelectorAll(".window"),o=document.querySelector(".fourline"),c=o.children,a=document.querySelector(".nav__li"),l=document.createElement("div");l.id="lightbox",document.body.appendChild(l);var s=6,d=7,u=new Array(s*d).fill("e"),f="opponent",m="you",v=m;function h(e){var t=parseInt(e.target.id.substring(6))%d;i.forEach(function(e){return e.classList.remove("column")});for(var n=t;n<s*d;n+=d)c.item(n).classList.add("column")}function y(e){element=e.target,element.classList.contains("circle")&&(element=element.parentElement);for(var t=parseInt(element.id.substring(6))%d+d*(s-1);;){if("e"===u[t]){u[t]=v.charAt(0),c.item(t).firstElementChild.classList.add("circle--selected".concat(v)),p(t);break}if((t-=d)<0)return}var n=v===m?"#1b0648":"#ff3399";a.style.backgroundColor=n,v=v===m?f:m}function p(e){for(var t=new Array,n=0,r=0;r<s;r++){t[r]=[];for(var i=0;i<d;i++)t[r][i]=u[n++]}b(g(e,t,-1,-1,1,1),0,e),b(g(e,t,-1,0,1,0),1,e),b(g(e,t,1,-1,-1,1),2,e),b(g(e,t,0,-1,0,1),3,e)}function b(e,t,n){var r=e.tab,i=e.pos,o=[8,7,-6,1][t],a=v.charAt(0).repeat(4),l=r.join("");if(l.includes(a)){for(var s,d=l.indexOf(a),u=n-(i-d)*o,f=d;f<l.length&&l[f]===v.charAt(0);f++)s=(f-d)*o+u,c.item(s).firstElementChild.classList.add("circle--won");setTimeout(function(){return A("YOU WON")},500)}}function g(t,n,r,i,o,c){var a=L(t,n,r,i),l=L(t,n,o,c);return a.reverse(),{tab:[].concat(e(a),[u[t]],e(l)),pos:a.length}}function L(e,t,n,r){for(var i=[],o=e%d,c=(e-o)/d,a=n,l=r,u=1;u<4;u++)c+n<s&&o+r<d&&c+n>=0&&o+r>=0&&i.push(t[c+n][o+r]),n+=a,r+=l;return i}function E(){v=m,a.style.backgroundColor="#ff3399";for(var e=0;e<u.length;e++)u[e]="e",c.item(e).firstElementChild.classList="circle"}function A(e){l.classList.add("lightbox--active"),l.style.display="block",l.style.display="flex";var t=document.createElement("div");t.classList.add("div--won"),t.innerHTML=e;var n=v===m?"#1b0648":"#ff3399";for(t.style.color=n;l.firstChild;)l.removeChild(l.firstChild);l.appendChild(t)}i.forEach(function(e){e.addEventListener("mouseenter",function(e){h(e)}),e.addEventListener("click",function(e){u.includes("e")||A("DRAW"),y(e)})}),a.addEventListener("click",function(){E()}),l.addEventListener("click",function(e){E(),l.classList.remove("lightbox--active"),l.style.display="none"}),o.addEventListener("mouseleave",function(){return i.forEach(function(e){return e.classList.remove("column")})});
},{}]},{},["vZyd"], null)
//# sourceMappingURL=app.647f0455.js.map