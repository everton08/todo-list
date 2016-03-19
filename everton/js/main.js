;(function() {
  'use strict';

  var $input = $('#add');
  var $list = $('#list');
  var $twoway = $('#twoway');
  var $doneAll = $('#check-all');
  var $completed = $('#completed');
  var $uncompleted = $('#uncompleted');
  var $all = $('#all');
  var $clear = $('#clear');

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
    render(DATAS);
  }

  function addEventListeners(){
    // Add
    $.on($input,'keyup', addItem);
    
    // Done
    $.delegate($list, 'input', 'click', doneItem );
    // Done All
    $.on($doneAll, 'click', doneAll );
    //completed
    $.on($completed, 'click', getDone);
    //uncompleted
    $.on($uncompleted, 'click', getToDo);
    //all
    $.on($all, 'click', getAll);
    // Delete
    $.delegate($list, 'button', 'click', deleteItem);
    //deleteDone
    $.on($clear, 'click', deleteDone);
  }

  function addItem(e) {
    $twoway.innerHTML = $input.value;
    var value = e.target.value;
    if(e.keyCode === ENTER_KEY){
      DATAS.push({id: new Date().getTime() ,task: value, done: false});
      render(DATAS);
    }
  }

  function doneAll(e){
    DATAS.forEach(function(task){
      (task.done) ? task.done = false : task.done = true;
      render(DATAS);
    });
  }

  function doneItem(e){
    var element = e.target.parentElement;
		DATAS.forEach(function(task){
			if(task.id == element.dataset.id){
				(task.done) ? task.done = false : task.done = true;
				render(DATAS);
			}
		});
  }

  function deleteItem(e){
		var li = e.target.parentElement;
		DATAS = DATAS.filter(function(task){
			return task.id != li.dataset.id;
		});
		render(DATAS);
  }
  function deleteDone(){
    DATAS = DATAS.filter(function(task){
      if(!task.done){
        return task;
      }
    });
    render(DATAS);
  }

  function getDone(){
    var completed = DATAS.filter(function(task){
      if(task.done){
        return task;
      }
    });
    render(completed);
  }

  function getToDo(){
    var unCompleted = DATAS.filter(function(task){
      if(!task.done){
        return task;
      }
    });
    render(unCompleted);
  }
  function getAll(){
    render(DATAS);
  }

  function render(datas){
    var fragmentLi = document.createDocumentFragment();
    var fragmentButton = document.createDocumentFragment();
    var fragmentCheck = document.createDocumentFragment();
    datas.forEach(function(value, index){
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
