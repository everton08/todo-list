;(function() {
  'use strict';

  var $input = $('#add');
  var $list = $('#list');
  var $twoway = $('#twoway');
  var $doneAll = $('#check-all');

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
    $.delegate($list, 'input', 'click', doneItem );
    // Done All
    $.on($doneAll, 'click', doneAll );
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
  }

  function doneAll(e){
    DATAS.forEach(function(task){
      (task.done) ? task.done = false : task.done = true;
      render();
    });
  }

  function doneItem(e){
    var element = e.target.parentElement;
		DATAS.forEach(function(task){
			if(task.id == element.dataset.id){
				(task.done) ? task.done = false : task.done = true;
				render();
			}
		});
  }

  function deleteItem(e){
		var li = e.target.parentElement;
		DATAS = DATAS.filter(function(task){
			return task.id != li.dataset.id;
		});
		render();
  }

  function render(){
    var fragmentLi = document.createDocumentFragment();
    var fragmentButton = document.createDocumentFragment();
    var fragmentCheck = document.createDocumentFragment();
    DATAS.forEach(function(value, index){
        var li = document.createElement('li');
        var check = document.createElement('input');
        check.type = 'checkbox';
        li.appendChild(check);
        li.dataset.id = value.id;
        var button = document.createElement('button');
        button.appendChild(document.createTextNode("X"));
        li.appendChild(document.createTextNode(value.task));
        if(value.done){
          li.setAttribute("class", "done");
          check.checked = true;
        }
        fragmentButton.appendChild(button);
        li.appendChild(fragmentButton);
        fragmentLi.appendChild(li);
    });
    $list.innerHTML = "";
    $twoway.innerHTML = "";
    $input.value = "";
    $list.appendChild(fragmentLi);
    controls();
  }

  function controls(){
    var itens = DATAS;
    var total = itens.length;
    var done = itens.filter(function(task){
      return task.done;
    });
    $doneAll.checked = total === done.length;
  }

  window.addEventListener('DOMContentLoaded', app);

})();
