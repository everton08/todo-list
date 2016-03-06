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
		doneItem();
		deleteItem();
  }

  function addEventListeners(){
    $.on($input,'keyup', function(e){
      $twoway.innerHTML = $input.value;
      var value = e.target.value;
      if(e.keyCode === ENTER_KEY){
          DATAS.push({task: value, done: false});
          render();
      }
    });
  }

	function doneItem(){
		$.delegate($list, 'li', 'click', function(e){
			DATAS.forEach(function(value){
				if(value.task === e.target.firstChild.data){
					$.toggleClass(e.target, "done");
					(value.done) ? value.done = false : value.done = true;
				}
			});
		});
	}

	function deleteItem(){
		$.delegate($list, 'button', 'click', function(btn){
			var li = this.parentElement;
			DATAS = DATAS.filter(function(contato){
				return contato.task != li.firstChild.data;
			});
			render();
		});
	}

  function render(){
    var fragmentLi = document.createDocumentFragment();
		var fragmentButton = document.createDocumentFragment();
    DATAS.forEach(function(value){
        var li = document.createElement('li');
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
