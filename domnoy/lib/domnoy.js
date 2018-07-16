/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
  switch (typeof arg) {
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      return getNodesFromDom(arg);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DomNodeCollection([arg]);
      }
  }
};

$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    for (const prop in obj) {
      base[prop] = obj[prop];
    }
  });
  return base;
};

$l.ajax = (options) => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET") {
    // data is query string for get
    options.url += `?${toQueryString(options.data)}`;
  }

  request.open(options.method, options.url, true);
  request.onload = (e) => {
    // NB: Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

// helper methods
toQueryString = (obj) => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};

registerDocReadyCallback = (func) => {
  if (!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DomNodeCollection(nodesArray);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach(func => func());
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.htmlElements = array;
  }

  html(string = false) {
    if (string) {
      this.htmlElements.forEach( (el) => {
        el.innerHTML = string;
      });
    }
    else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.htmlElements.forEach( (el) => {
      el.innerHTML = "";
    });
  }

  append(arg) {
    this.htmlElements.forEach( (el) => {
      el.innerHTML += arg;
    });
  }

  attr(getter, setter) {
    if (getter && !setter) {
      // console.log(this.htmlElements);
      return this.htmlElements[0].getAttribute(getter);
    }
    else if (getter && setter) {
      this.htmlElements.forEach( (el)=> {
        el.setAttribute(getter, setter);
      });
    }
    return this.htmlElements[0].setAttribute;
  }

  addClass(newClass) {
    this.htmlElements.forEach( (el) => {
      el.classList.add(newClass);
    });
  }

  removeClass(deleteClass) {
    this.htmlElements.forEach( (el) => {
      el.classList.remove(deleteClass);
    });
  }

  children(){
    let allChildren = [];
    this.htmlElements.forEach( (el) => {
      let elChildren = el.children;
      for (var i = 0; i < elChildren.length; i++) {
        allChildren.push(elChildren[i]);
      }
    });
    return new DOMNodeCollection(allChildren);
  }

  parent() {
    let allParents = [];
    this.htmlElements.forEach( (el) => {
      let elParent = el.parentNode;
      // console.log(elParent);
      allParents.push(elParent);
    });
    return new DOMNodeCollection(allParents);
  }

  find(arg) {
    let findChildren = [];
    this.htmlElements.forEach( (el) => {
      let elChildren = el.children;
      for (var i = 0; i < elChildren.length; i++) {
        if(elChildren[i].nodeName === arg.toUpperCase()) {
          findChildren.push(elChildren[i]);
        }
      }
    });
    return new DOMNodeCollection(findChildren);
  }

  remove() {
    this.htmlElements.forEach( (el) => {
      el.outerHTML = "";

    });
    this.htmlElements = [];
  }

    setAttribute(styleName, actualstyle) {
      let id = this.htmlElements[0].id;
      let htmlElement = document.getElementById(id);
      htmlElement.style[styleName] = actualstyle;

    }
}

DOMNodeCollection.prototype.on = function(type, callback){
  this.htmlElements.forEach( (el) => {
    el.addEventListener(type, callback);
    el.callback = callback;
  });
};

DOMNodeCollection.prototype.off = function(type){
  this.htmlElements.forEach( (el) => {
    el.removeEventListener(type, el.callback);
  });
};



module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=domnoy.js.map