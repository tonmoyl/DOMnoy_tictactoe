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
    console.log(this.htmlElements);
    // this.outerHTML = "";
  }

    setAttribute(styleName, actualstyle) {
      let id = this.htmlElements[0].id;
      let htmlElement = document.getElementById(id);
      // htmlElement.style.cssText = `${styleName}: ${actualstyle}`;
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
