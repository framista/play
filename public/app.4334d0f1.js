parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vZyd":[function(require,module,exports) {
function e(e){return r(e)||n(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function n(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function r(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var i=document.querySelectorAll(".window"),o=document.querySelector(".fourline"),c=o.children,a=document.querySelector(".nav__li"),l=document.createElement("div");l.id="lightbox",document.body.appendChild(l);var s=6,f=7,d=new Array(s*f).fill("e"),u="opponent",m="you",v=m;function h(e){var t=parseInt(e.target.id.substring(6))%f;i.forEach(function(e){return e.classList.remove("column")});for(var n=t;n<s*f;n+=f)c.item(n).classList.add("column")}function y(e){element=e.target,element.classList.contains("circle")&&(element=element.parentElement);for(var t=parseInt(element.id.substring(6))%f+f*(s-1);;){if("e"===d[t]){d[t]=v.charAt(0),c.item(t).firstElementChild.classList.add("circle--selected".concat(v)),p(t);break}if((t-=f)<0)return}var n=v===m?"#cc33ff":"#ff3399";a.style.backgroundColor=n,v=v===m?u:m}function p(e){for(var t=new Array,n=0,r=0;r<s;r++){t[r]=[];for(var i=0;i<f;i++)t[r][i]=d[n++]}b(g(e,t,-1,-1,1,1),0,e),b(g(e,t,-1,0,1,0),1,e),b(g(e,t,1,-1,-1,1),2,e),b(g(e,t,0,-1,0,1),3,e)}function b(e,t,n){var r=e.tab,i=e.pos,o=[8,7,-6,1][t],a=v.charAt(0).repeat(4),l=r.join("");if(l.includes(a)){for(var s,f=l.indexOf(a),d=n-(i-f)*o,u=f;u<l.length&&l[u]===v.charAt(0);u++)s=(u-f)*o+d,c.item(s).firstElementChild.classList.add("circle--won");setTimeout(function(){return A()},500)}}function g(t,n,r,i,o,c){var a=L(t,n,r,i),l=L(t,n,o,c);return a.reverse(),{tab:[].concat(e(a),[d[t]],e(l)),pos:a.length}}function L(e,t,n,r){for(var i=[],o=e%f,c=(e-o)/f,a=n,l=r,d=1;d<4;d++)c+n<s&&o+r<f&&c+n>=0&&o+r>=0&&i.push(t[c+n][o+r]),n+=a,r+=l;return i}function E(){v=m,a.style.backgroundColor="#ff3399";for(var e=0;e<d.length;e++)d[e]="e",c.item(e).firstElementChild.classList="circle"}function A(){l.classList.add("lightbox--active"),l.style.display="block",l.style.display="flex";var e=document.createElement("div");e.classList.add("div--won"),e.innerHTML="YOU WON";var t=v===m?"#cc33ff":"#ff3399";for(e.style.color=t;l.firstChild;)l.removeChild(l.firstChild);l.appendChild(e)}i.forEach(function(e){e.addEventListener("mouseenter",function(e){h(e)}),e.addEventListener("click",function(e){y(e)})}),a.addEventListener("click",function(){E()}),l.addEventListener("click",function(e){E(),l.classList.remove("lightbox--active"),l.style.display="none"}),o.addEventListener("mouseleave",function(){return i.forEach(function(e){return e.classList.remove("column")})});
},{}]},{},["vZyd"], null)
//# sourceMappingURL=app.4334d0f1.js.map