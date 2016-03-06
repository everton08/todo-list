;(function() {
  'use strict';

  var $input = $('#add');
  var $list = $('#list');
  var $itens;
  var $twoway = $('#twoway');
  var ENTER_KEY = 13;
  var DATAS = [
    {
			id: 12000001,
      task: "Teste 01",
      done: false
    },
    {
			id: 12000002,
      task: "Teste 02",
      done: false
    },
    {
			id: 12000003,
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
      DATAS.push({id: new Date().getTime() ,task: value, done: false});
      render();
    }
		$.c("DATAS", DATAS);
  }

  function doneItem(e){
    var element = e.target;
		DATAS.forEach(function(task){
			if(task.id == element.dataset.id){
				(task.done) ? task.done = false : task.done = true;
				render();
			}
		});
  }

  function deleteItem(e){
    // pegar o dataset do pai
  }

  function render(){
    var fragmentLi = document.createDocumentFragment();
    var fragmentButton = document.createDocumentFragment();
    DATAS.forEach(function(value, index){
        var li = document.createElement('li');
        li.dataset.id = value.id;
        var button = document.createElement('button');
        button.appendChild(document.createTextNode("X"));
        li.appendChild(document.createTextNode(value.task));
				if(value.done){
					li.setAttribute("class", "done");
				}
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
