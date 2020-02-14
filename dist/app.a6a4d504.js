// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/app.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var windows = document.querySelectorAll('.window');
var fourlineBoard = document.querySelector('.fourline');
var childrenBoard = fourlineBoard.children;
var tab = document.querySelector(".nav__li");
var lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);
var rowsBoard = 6;
var columnsBoard = 7;
var valueBoard = new Array(rowsBoard * columnsBoard).fill("e");
var opponent = "opponent";
var you = "you";
var player = you;
windows.forEach(function (window) {
  window.addEventListener('mouseenter', function (e) {
    checkColumn(e);
  });
  window.addEventListener('click', function (e) {
    addChip(e);
  });
});
tab.addEventListener('click', function () {
  startAgain();
});
lightbox.addEventListener('click', function (e) {
  startAgain();
  lightbox.classList.remove('lightbox--active');
  lightbox.style.display = "none";
});
fourlineBoard.addEventListener('mouseleave', function () {
  return windows.forEach(function (window) {
    return window.classList.remove("column");
  });
});

function checkColumn(e) {
  var position = parseInt(e.target.id.substring(6));
  var column = position % columnsBoard;
  windows.forEach(function (window) {
    return window.classList.remove("column");
  });

  for (var i = column; i < rowsBoard * columnsBoard; i += columnsBoard) {
    childrenBoard.item(i).classList.add("column");
  }
}

function addChip(e) {
  element = e.target;

  if (element.classList.contains("circle")) {
    element = element.parentElement;
  }

  var position = parseInt(element.id.substring(6));
  var column = position % columnsBoard;
  var insertIndex = column + columnsBoard * (rowsBoard - 1);

  while (true) {
    if (valueBoard[insertIndex] === "e") {
      valueBoard[insertIndex] = player.charAt(0);
      childrenBoard.item(insertIndex).firstElementChild.classList.add("circle--selected".concat(player));
      isFinished(insertIndex);
      break;
    }

    insertIndex -= columnsBoard;
    if (insertIndex < 0) return;
  }

  var color = player === you ? "#cc33ff" : "#ff3399";
  tab.style.backgroundColor = color;
  player = player === you ? opponent : you;
}

function isFinished(position) {
  var tabBoard = new Array();
  var counter = 0;

  for (var x = 0; x < rowsBoard; x++) {
    tabBoard[x] = [];

    for (var y = 0; y < columnsBoard; y++) {
      tabBoard[x][y] = valueBoard[counter++];
    }
  }

  var bias1 = generateTable(position, tabBoard, -1, -1, 1, 1);
  isWin(bias1, 0, position);
  var vertically = generateTable(position, tabBoard, -1, 0, 1, 0);
  isWin(vertically, 1, position);
  var bias2 = generateTable(position, tabBoard, 1, -1, -1, 1);
  isWin(bias2, 2, position);
  var horizontally = generateTable(position, tabBoard, 0, -1, 0, 1);
  isWin(horizontally, 3, position);
}

function isWin(toVerify, direction, position) {
  var tab = toVerify.tab,
      pos = toVerify.pos;
  var tabDirection = [8, 7, -6, 1];
  var moveAmount = tabDirection[direction];
  var pattern = player.charAt(0).repeat(4);
  var comparison = tab.join("");

  if (comparison.includes(pattern)) {
    var startIndex = comparison.indexOf(pattern);
    var startPosition = position - (pos - startIndex) * moveAmount;
    var circleWonPosition;

    for (var i = startIndex; i < comparison.length; i++) {
      if (comparison[i] !== player.charAt(0)) {
        break;
      }

      circleWonPosition = (i - startIndex) * moveAmount + startPosition;
      childrenBoard.item(circleWonPosition).firstElementChild.classList.add("circle--won");
    }

    setTimeout(function () {
      return wonLightbox();
    }, 500);
  }
}

function generateTable(position, tabBoard, inc1, inc2, inc3, inc4) {
  var tab1 = generateSubTable(position, tabBoard, inc1, inc2);
  var tab2 = generateSubTable(position, tabBoard, inc3, inc4);
  tab1.reverse();
  var tab = [].concat(_toConsumableArray(tab1), [valueBoard[position]], _toConsumableArray(tab2));
  return {
    tab: tab,
    pos: tab1.length
  };
}

function generateSubTable(position, tabBoard, incrementRow, incrementColumn) {
  var tab = [];
  var currentColumn = position % columnsBoard;
  var currentRow = (position - currentColumn) / columnsBoard;
  var temp1 = incrementRow;
  var temp2 = incrementColumn;

  for (var i = 1; i < 4; i++) {
    if (currentRow + incrementRow < rowsBoard && currentColumn + incrementColumn < columnsBoard && currentRow + incrementRow >= 0 && currentColumn + incrementColumn >= 0) {
      tab.push(tabBoard[currentRow + incrementRow][currentColumn + incrementColumn]);
    }

    incrementRow += temp1;
    incrementColumn += temp2;
  }

  return tab;
}

function startAgain() {
  player = you;
  tab.style.backgroundColor = "#ff3399";

  for (var i = 0; i < valueBoard.length; i++) {
    valueBoard[i] = "e";
    childrenBoard.item(i).firstElementChild.classList = "circle";
  }
}

function wonLightbox() {
  lightbox.classList.add('lightbox--active');
  lightbox.style.display = "block";
  lightbox.style.display = "flex";
  var div = document.createElement('div');
  div.classList.add('div--won');
  div.innerHTML = "YOU WON";
  var color = player === you ? "#cc33ff" : "#ff3399";
  div.style.color = color;

  while (lightbox.firstChild) {
    lightbox.removeChild(lightbox.firstChild);
  }

  lightbox.appendChild(div);
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60226" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map