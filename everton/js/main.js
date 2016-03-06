;(function() {
  'use strict';

  var $input = $('#add');
  var $list = $('#list');
  var $itens;
  var $twoway = $('#twoway');
  var ENTER_KEY = 13;
  var DATAS = [
    {
      task: "Teste 01",
      done: false
    },
    {
      task: "Teste 02",
      done: false
    },
    {
      task: "Teste 03",
      done: false
    }
  ];

  function app() {
    addEventListeners();
    render();
  }

  function addEventListeners(){
    // Add
    $.on($input,'keyup', addItem);
    // Done
    $.delegate($list, 'li', 'click', doneItem );
    // Delete
    $.delegate($list, 'button', 'click', deleteItem);
  }

  function addItem(e) {
    $twoway.innerHTML = $input.value;
    var value = e.target.value;
    if(e.keyCode === ENTER_KEY){
      DATAS.push({task: value, done: false});
      render();
    }
  }

  function doneItem(e){
    var element = e.target;
    console.log(element.dataset.index);
  }

  function deleteItem(e){
    // pegar o dataset do pai
  }

  function render(){
    var fragmentLi = document.createDocumentFragment();
    var fragmentButton = document.createDocumentFragment();
    DATAS.forEach(function(value, index){
        var li = document.createElement('li');
        li.dataset.index = index;
        var button = document.createElement('button');
        button.appendChild(document.createTextNode("X"));
        li.appendChild(document.createTextNode(value.task));
        fragmentButton.appendChild(button);
        li.appendChild(fragmentButton);
        fragmentLi.appendChild(li);
    });
    $list.innerHTML = "";
    $twoway.innerHTML = "";
    $input.value = "";
    $list.appendChild(fragmentLi);
  }

  window.addEventListener('DOMContentLoaded', app);

})();
