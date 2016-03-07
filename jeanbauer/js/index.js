;(function(){
  'use strict';

  var $input = $('#add'),
      $add = $('#add'),
      $list = $('#list'),
      $mirrorSpan = $('#mirrorSpan'),
      $btnCompletedTask = $('#comTask'),
      $btnUncompletedTask = $('#uncTask'),
      $btnAllTask = $('#allTask'),
      $btnUndo = $('#undo'),
      $footer = $('footer');

  var ENTER_KEY = 13;
  var UNDO = [];

  var datas = [{
    id: 0,
    task: "Jean lindao",
    done: false
  },{
    id: 1,
    task: "Palmer genio",
    done: false
  },{
    id: 2,
    task: "Everton sk8",
    done: false
  },{
    id: 3,
    task: "Eric motoqueiro",
    done: false
  }];

  function App(){
    addEventListeners();
    render(datas);
  };

  function Undo() {
    console.log("TO DO: Undo object", UNDO[UNDO.length - 1]);
  }

  function Done(obj) {
    var id = parseInt(obj.getAttribute("data-id"));
    var i = datas.length;
    var li = document.querySelectorAll('[data-id="'+ obj.getAttribute("data-id") + '"]');
    while(i--){
      if(datas[i].id === id && !datas[i].done){
        datas[i].done = true;
      }else if(datas[i].id === id && datas[i].done){
        datas[i].done = false;
      }
   }
   render(datas);
  }

  function Delete(obj) {
    var id = parseInt(obj.getAttribute("data-id"));
    var i = datas.length;
    while(i--){
      if(datas[i].id === id){
        Undo(UNDO.push(datas.splice(i,1))); break;
      }
   }
   render(datas);
    // Removendo do DOM
    // var elementIWannaRemove = document.querySelectorAll('[button-id="'+ obj.getAttribute("data-id") + '"]');
    // elementIWannaRemove[0].parentNode.parentNode.removeChild(elementIWannaRemove[0].parentNode);
  }

  function Insert(task) {
    datas.push({
      id: datas[datas.length - 1].id + 1,
      task: task,
      done: false
    })
  }

  function addEventListeners() {
    $.on($input, 'keyup', function(e){
      var value = e.target.value;
      if(e.keyCode === ENTER_KEY){
        Insert(value);
        render();
      }

      $mirrorSpan.innerHTML = $input.value;
      // Para adicionar somente a ultima linha
      //$twoway.appendChild(document.createTextNode($input.value.substr($input.value.length == 0 ? 0: - 1, 1)));
    });

    $.delegate($list, '#list button','click', function(e){Delete(e.target.parentNode);});
    $.delegate($list, '#list span','click', function(e){Done(e.target.parentNode);});

    $.on($btnCompletedTask, 'click', function(e){
      var data = [];
      datas.forEach(function(e){
        if(e.done){
          data.push(e)
        }
      });
      console.log(data);
      render(data);
    });
    $.on($btnUncompletedTask, 'click', function(e){
      var data = [];
      datas.forEach(function(e){
        if(!e.done){
          data.push(e)
        }
      });
      console.log(data);
      render(data);
    });
    $.on($btnAllTask, 'click', function(e){
      render(datas);
    });
    $.on($btnUndo, 'click', function(e){
      console.log('working on that =)');
    });
    $.on($btnUndo, 'click', function(e){
      console.log('working on that =)');
    });
  };

  function render(data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function(e){
      var li = document.createElement('li');
      var btn = document.createElement('button');
      var span = document.createElement('span');
      btn.appendChild(document.createTextNode("x"));
      span.appendChild(document.createTextNode(e.task));
      li.appendChild(span);
      li.appendChild(btn);
      li.setAttribute("data-id", e.id);
      e.done? li.classList.add('strike'): li.classList.remove('strike');
      fragment.appendChild(li);
    });
    $mirrorSpan.innerHTML = "";
    $list.innerHTML = "";
    $input.value = "";
    $list.appendChild(fragment);
    UNDO.length? $footer.style.display = "block" : $footer.style.display = "none";
  };

  window.addEventListener('DOMContentLoaded', App);

})();
