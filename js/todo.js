let elForm = document.querySelector('.js-form');
let elInput= document.querySelector('.js-input');
let elList = document.querySelector('.js-list');

const localData = localStorage.getItem('token');

const renderTodo = (array,node) => {
  node.innerHTML = "";

  array.forEach((todo) => {
    node.innerHTML += `
      <li class="item js-item">
       <p class="text">${todo.todo_value}</p>
       <div class="too-box">
        <button class="todo-btn js-edit">Edit</button>
        <button class="todo-btn js-delete">Delate</button>
       </div>
      </li>
    `
  })
}

async function getTodos(){
  const res = await fetch('http://192.168.100.8:5000/todo',{
    headers: {
      Authorization: localData,
    }
  });
  const data = await res.json();
  renderTodo(data,elList)
}

getTodos();

elForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  fetch('http://192.168.100.8:5000/todo',{
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      Authorization: localData,
    },
    body:JSON.stringify({
      text: elInput.value
    })
  })
  .then((res)=> res.json())
  .then((data)=> {
    if(data){
      getTodos()
    }
  })
  .catch((err)=>console.log(err))
})


const deleteTodo = (id) => {
  fetch(`http://192.168.100.8:5000/todo/${id}`, {
    method: 'DELETE',
    headers:{
      Authorization: localData,
    },
  })
  .then((res)=> res.json())
  .then((data)=> {
    if(data){
      getTodos()
    }
  })
  .catch((err)=>console.log(err))
}

const editTodo = (id) => {
  const newValue = prompt('enter text');
  fetch(`http://192.168.100.8:5000/todo/${id}`, {
    method: 'PUT',
    headers:{
      'Content-Type':'application/json',
      Authorization: localData,
    },
    body: JSON.stringify({
      text: newValue,
    })
  })
  .then((res)=> res.json())
  .then((data)=> console.log(data))
  .catch((err)=>console.log(err))
}

elList.addEventListener('click', (evt) => {
  if(evt.target.matches('.js-delete')){
    const todoId = evt.target.dataset.todoId;
    deleteTodo(todoId)
  }
  if(evt.target.matches('.js-edit')){
    const todoId = evt.target.dataset.todoId;
    editTodo(todoId)
  }
})