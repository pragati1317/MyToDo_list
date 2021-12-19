// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');

const todolist = document.querySelector('.todo-list');
const header = document.querySelector('.header');
const select=document.querySelector('.select');
//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click", addTodo);
todolist.addEventListener("click", deleteAndCheck);
select.addEventListener("click", filterTodo );

//Function
function addTodo(event) {
    //prevent from from submitting 
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create LI

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    if (todoInput.value != "") {
        todoDiv.appendChild(newTodo);
        //ADD ToDO TO LOCAL STORAGE 
        saveLocalTodos(todoInput.value); 
        //CHECKED mark Button

        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Apened To list
        todolist.appendChild(todoDiv);
        //clear TODO INPUT VALUE
        todoInput.value = "";
    }
   

}

function deleteAndCheck(e) {
    const item = e.target;
   
    if (item.classList[0] == 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodo(todo);
        //removing element;
        todo.addEventListener('transitionend', function()
        {
           todo.remove();
        });
    }
    else if(item.classList[0]=='complete-btn')
    {
       const todo=item.parentElement;
       todo.classList.add('completed');
    }
}

function filterTodo(e)
{
     const todos = todolist.childNodes;
     todos.forEach(function(todo)
     {
         switch(e.target.value)
         {
                case 'all':
                 todo.style.display='flex';
                    break;
                case "completed":
                    if(todo.classList.contains('completed'))
                    {
                        todo.style.display='flex';
                    }
                    else{
                        todo.style.display='none';
                    }
                    break;
                case "uncompleted":
                    if(todo.classList.contains('completed'))
                    {
                        todo.style.display='none';
                    }
                    else{
                        todo.style.display='flex';
                    }
                break;
         }
     });
}

function saveLocalTodos(todo)
{
    //Check --HEY DO I ALREADY have thing in there?
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo)
    {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create LI
    
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        
            todoDiv.appendChild(newTodo);
        
           
            //CHECKED mark Button
    
            const completedButton = document.createElement('button')
            completedButton.innerHTML = '<i class="fas fa-check"></i>'
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            //trash button
            const trashButton = document.createElement('button')
            trashButton.innerHTML = '<i class="fas fa-trash"></i>'
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);
            //Apened To list
            todolist.appendChild(todoDiv);
            //clear TODO INPUT VALUE
            todoInput.value = "";
        
    });
}

function removeLocalTodo(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else
    {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    // By This we can have a value of deleting element
    console.log(todo.children[0].innerText);
   const todoIndex=todo.children[0].innerText;
   // Now lets find a index value of that deleting element
    //splice method use for a removing element from local storage of web browser 
    // todoindex is position and second parameter is how many time i want to remove a element
   todos.splice(todos.indexof(todoIndex),1);
   localStorage.setItem("todos", JSON.stringify(todos));

}