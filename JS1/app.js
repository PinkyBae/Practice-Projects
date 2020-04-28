//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(event) {
	//prevent button from submtitting
	event.preventDefault();
	
	//Todo Div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	
	//Create LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	
	//ADD TODO TO LOCAL STORAGE
	saveLocalTodos(todoInput.value);
	//Check Mark Button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fa fa-check"></i>';
	completedButton.classList.add("completed-btn");
	todoDiv.appendChild(completedButton);
	//Trash Button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fa fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	
	//Append div to list
	todoList.appendChild(todoDiv);
	
	//clear textfield
	todoInput.value="";
}

function deleteCheck(e){
	//console.log(e.target);
	const item = e.target;
	
	//delete
	if(item.classList[0] === 'trash-btn'){
		//item.parentElement.remove();
		const todo = item.parentElement;
		//animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		//wait for animation to end
		todo.addEventListener('transitionend',function(){
			//deletion
			todo.remove();
		});
		
	}
	
	//check mark
	if(item.classList[0] === 'completed-btn'){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}	
}

function filterTodo(e){
	const todos = todoList.childNodes;
	//console.log(todos);
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":	
				todo.style.display = 'flex';
				break;
			case "completed":
				if(todo.classList.contains("completed")){
					todo.style.display = 'flex';
				}
				else{
					todo.style.display = 'none';
				}
				break;
			case "incomplete":
				if(!todo.classList.contains("completed")){
					todo.style.display = 'flex';
				}
				else{
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos(todo){
	//Check if things are already present in the local storage
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	//update the local storage
	localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	
	todos.forEach(function(todo){
		//Todo Div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		
		//Create LI
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		
		//Check Mark Button
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class="fa fa-check"></i>';
		completedButton.classList.add("completed-btn");
		todoDiv.appendChild(completedButton);
		//Trash Button
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fa fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		
		//Append div to list
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	
	//console.log(todo);
	//console.log(todo.children);
	//console.log(todo.children[0].innerText);
	const todoIndex = todo.children[0].innerText;
	//console.log(todos.indexOf(todoIndex));
	todos.splice(todos.indexOf(todoIndex),1);	//to delete data from array
	//update the local storage
	localStorage.setItem("todos",JSON.stringify(todos));
}
