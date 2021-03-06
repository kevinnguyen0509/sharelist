// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"48KVj":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "afb742f2e085b5374b064e171dd7fb88";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('???? [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] ???? Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ??? Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          ???? ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
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
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
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
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"7nHQo":[function(require,module,exports) {
var _modelGroceryListModelJs = require("../model/groceryListModel.js");
var _modelRenderModelJs = require("../model/renderModel.js");
var _jsUtilsArrayJs = require("../js/utils/array.js");
// https://agile-everglades-82259.herokuapp.com/
const overlay = document.querySelector(".overlay");
const productScrollOverlay = document.querySelector(".product-image-page");
const addGroceryInputBox = document.querySelector(".add-item-input");
const groceryListItems = document.querySelector(".col-container");
// const groceryList = await GroceryList.getAllGroceryList();
const groceryList = async () => {
  const result = await _modelGroceryListModelJs.getAllGroceryList();
  return result;
};
(async () => {
  const groceryList2 = await groceryList();
  _modelRenderModelJs.allGroceryListItems(groceryList2, groceryListItems);
})();
_modelRenderModelJs.deleteAllList(addGroceryInputBox, _modelGroceryListModelJs);
// Render.allGroceryListItems(groceryList2, groceryListItems);
let groceryItemClicked = document.querySelectorAll(".item-container");
_modelRenderModelJs.updatedList(groceryItemClicked, _modelGroceryListModelJs);
_modelRenderModelJs.dismissOverlay(overlay, productScrollOverlay);
_modelRenderModelJs.addToDatabase(addGroceryInputBox, overlay, productScrollOverlay, _jsUtilsArrayJs.groceryPictureArray, _modelGroceryListModelJs, groceryListItems);

},{"../model/groceryListModel.js":"4GqJv","../model/renderModel.js":"yTJdS","../js/utils/array.js":"6mpcC"}],"4GqJv":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getAllGroceryList", function () {
  return getAllGroceryList;
});
_parcelHelpers.export(exports, "addItem", function () {
  return addItem;
});
_parcelHelpers.export(exports, "updateItem", function () {
  return updateItem;
});
_parcelHelpers.export(exports, "deleteAll", function () {
  return deleteAll;
});
async function getAllGroceryList() {
  try {
    const allGroceryList = await fetch("https://agile-everglades-82259.herokuapp.com/api/v1/grocery/");
    const groceryJson = await allGroceryList.json();
    return groceryJson.groceryList;
  } catch (err) {
    console.log("Not correct route.");
  }
}
async function addItem(name, imageString) {
  try {
    const response = await fetch("https://agile-everglades-82259.herokuapp.com/api/v1/grocery/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: imageString,
        isBought: false
      })
    });
    return response.json();
  } catch (err) {
    console.log("You already have that item");
  }
}
async function updateItem(id, isBought) {
  try {
    const response = await fetch("https://agile-everglades-82259.herokuapp.com/api/v1/grocery/" + id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isBought: isBought
      })
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
}
async function deleteAll() {
  try {
    const response = await fetch("https://agile-everglades-82259.herokuapp.com/api/v1/grocery/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    location.reload();
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"yTJdS":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "allGroceryListItems", function () {
  return allGroceryListItems;
});
_parcelHelpers.export(exports, "updatedList", function () {
  return updatedList;
});
_parcelHelpers.export(exports, "addToDatabase", function () {
  return addToDatabase;
});
_parcelHelpers.export(exports, "dismissOverlay", function () {
  return dismissOverlay;
});
_parcelHelpers.export(exports, "deleteAllList", function () {
  return deleteAllList;
});
// Display all grocery list
function allGroceryListItems(groceryList, groceryListItems) {
  for (let i = 0; i < groceryList.length; i++) {
    if (groceryList[i].isBought) {
      // turn background green by adding background green class in css
      groceryListItems.insertAdjacentHTML("beforeend", `<div class="item-container background-green" id="${groceryList[i]._id}" isBought="${groceryList[i].isBought}">
        <i class="flaticon-${groceryList[i].image} flaticonss" " ></i>
        <p>${groceryList[i].name}</p>
      </div>`);
    } else {
      // Keep background not green
      groceryListItems.insertAdjacentHTML("beforeend", `<div class="item-container" id="${groceryList[i]._id}" isBought="${groceryList[i].isBought}">
        <i class="flaticon-${groceryList[i].image} flaticonss"  ></i>
        <p>${groceryList[i].name}</p>
      </div>`);
    }
  }
}
function updatedList(groceryItemClicked, GroceryList) {
  for (let i = 0; i < groceryItemClicked.length; i++) {
    groceryItemClicked[i].addEventListener("click", function (item) {
      groceryItemClicked[i].classList.add("background-green");
      if (groceryItemClicked[i].getAttribute("isbought") == "false") {
        GroceryList.updateItem(groceryItemClicked[i].id, true);
        groceryItemClicked[i].setAttribute("isbought", "true");
      } else {
        GroceryList.updateItem(groceryItemClicked[i].id, false);
        groceryItemClicked[i].classList.remove("background-green");
        groceryItemClicked[i].setAttribute("isbought", "false");
      }
    });
  }
}
function addToDatabase(addGroceryInputBox, overlay, productScrollOverlay, groceryPictureArray, GroceryList, // Grocery List is GroceryListModel
groceryListItems) {
  addGroceryInputBox.addEventListener("keyup", function () {
    overlay.classList.remove("hidden");
    productScrollOverlay.classList.remove("hidden");
    productScrollOverlay.innerHTML = "";
    for (let i = 0; i < groceryPictureArray.length; i++) {
      productScrollOverlay.insertAdjacentHTML("beforeend", `<div class="search-img-container">
          <i class="flaticon-${groceryPictureArray[i]} flaticons-search" title="${groceryPictureArray[i]}"></i>
          </div>`);
    }
    // Add One
    const searchIcon = document.querySelectorAll(".flaticons-search");
    for (let i = 0; i < searchIcon.length; i++) {
      searchIcon[i].addEventListener("click", function () {
        GroceryList.addItem(addGroceryInputBox.value, searchIcon[i].title);
        groceryListItems.insertAdjacentHTML("beforeend", `<div class="item-container">
              <i class="flaticon-${searchIcon[i].title} flaticonss"></i>
              <p>${addGroceryInputBox.value}</p>
            </div>`);
        addGroceryInputBox.value = "";
        overlay.classList.add("hidden");
        productScrollOverlay.classList.add("hidden");
      });
    }
  });
}
function dismissOverlay(overlay, productScrollOverlay) {
  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    productScrollOverlay.classList.add("hidden");
  });
}
function deleteAllList(addGroceryInputBox, GroceryList) {
  addGroceryInputBox.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      if (addGroceryInputBox.value == "/delete") {
        GroceryList.deleteAll();
      }
    }
  });
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6mpcC":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "groceryPictureArray", function () {
  return groceryPictureArray;
});
let groceryPictureArray = ["apple-1", "apple-jam", "apple", "avocado", "barbecue", "birthday-cake-1", "birthday-cake-2", "birthday-cake-3", "birthday-cake", "blender", "boiled-egg", "bone", "bottle", "bread-1", "bread", "brochette-1", "brochette-2", "brochette-3", "brochette", "cake-slice-1", "cake-slice", "cake", "candy-1", "candy-2", "candy", "carrot", "champagne-1", "champagne-2", "champagne-3", "champagne-4", "champagne-5", "champagne-glass", "champagne", "cheese", "chef-hat", "chef", "cherries-1", "cherries", "chicken-leg-1", "chicken-leg", "chocolate", "cocktail", "coffee-beans", "coffee-cup-1", "coffee-cup-2", "coffee-cup-3", "coffee-cup", "coffee-grinder", "coffee-machine", "cookie-1", "cookie-2", "cookie", "cucumber-1", "cucumber", "cupcake-1", "cupcake", "cutlery", "doughnut-1", "doughnut-2", "doughnut-3", "doughnut-4", "doughnut-5", "doughnut-6", "doughnut-7", "doughnut", "easter-egg", "egg", "eggplant", "eggs-1", "eggs-2", "eggs", "fast-food", "faucet", "feeder-1", "feeder-2", "feeder", "flour", "french-fries", "fridge", "fried-egg", "garlic", "grapefruit-1", "grapefruit", "grill-1", "grill", "groceries", "hamburger-1", "hamburger-2", "hamburger-3", "hamburger", "hot-dog", "hot-drink", "ice-cream-1", "ice-cream-2", "ice-cream-3", "ice-cream-4", "ice-cream-5", "ice-cream-6", "ice-cream-7", "ice-cream", "ice-lolly-1", "ice-lolly-2", "ice-lolly-3", "ice-lolly-4", "ice-lolly-5", "ice-lolly-6", "ice-lolly-7", "ice-lolly", "lemon-slice", "lemonade", "lollipop-1", "lollipop-2", "lollipop-3", "lollipop-4", "lollipop", "meal", "meat", "melon", "menu", "milk-1", "milk", "mitten", "mixer", "muffin-1", "muffin-2", "muffin-3", "muffin", "mushroom", "noodles-1", "noodles-2", "noodles", "nut", "olive-oil", "olive", "onion", "orange-1", "orange-2", "orange", "pear", "peeler", "pepper", "pitcher-1", "pitcher", "pizza-1", "pizza-2", "pizza-3", "pizza", "pot-1", "pot-2", "pot-3", "pot", "pumpkin", "restaurant-1", "restaurant-2", "restaurant", "rice-1", "rice", "roast-chicken-1", "roast-chicken", "salmon", "sausage-1", "sausage-2", "sausage", "shop-1", "shop", "snack", "soft-drink-1", "soft-drink-2", "soft-drink-3", "soft-drink-4", "soft-drink", "soup-1", "soup-2", "soup-3", "soup-4", "soup-5", "soup-6", "soup-7", "soup-8", "soup-9", "soup-ladle", "soup", "spatula", "squeezer", "sugar", "sushi", "syrup-1", "syrup", "taco", "toast-1", "toast", "toiletries", "tomato", "tray", "turnip-1", "turnip", "watermelon", "wheat", "wine-glass", "wine"];

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["48KVj","7nHQo"], "7nHQo", "parcelRequireacd8")

//# sourceMappingURL=index.1dd7fb88.js.map
