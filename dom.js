const $ = function (selector) {
    const nodeList = document.querySelectorAll(selector);
  
    const text = function(content){
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerText = content;
      }
    }
    
    const html = function(content){
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML = content;
      }
    }
  
    const addClass = function(className){
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.add(className);
      }
    }
  
    const removeClass = function(className){
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.remove(className);
      }
    }
  
    const toggleClass = function(className){
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.toggle(className);
      }
    }
  
    const empty = function(){
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML = '';
      }
    }
  
    const append = function(content){
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML += content;
      }
    }
  
    const prepend = function(content){
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML = content + nodeList[i].innerHTML;
      }
    }
  
    const val = function (content) {
        if(content === undefined){
          return nodeList[0].value; 
        } else {
          nodeList[0].value = content;
        }     
    }
  
    const on = function (action, cb) {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].addEventListener(action, cb);
      }
    }
    const show = function () {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.display = '';
      }
    }
    const hide = function () {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.display = 'none';
      }  
    }
  
    return {
      text: text,
      html: html,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass,
      empty: empty,
      append: append,
      prepend: prepend,
      on: on,
      val: val,
      show: show,
      hide: hide
    };
  }