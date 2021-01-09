//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);
document.addEventListener("DOMContentLoaded", getTodos); //displays all the existing todos from local storage


//Functions
function addTodo(event){
    //Prevent from form submitting
    event.preventDefault(); /*This prevents the default loading of the click event in the todoButton */
    
    //Add the new todo to local storage
    saveLocalTodos(todoInput.value);

    //Todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo"); /* classList allows to add or remove classes without affecting the other classes of the element. className will wipe out any existing classes while adding the new one*/

    //Create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear todoInput.value
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target; /* event.target returns the element that triggered the event in the todoList*/
    
    //if the element clicked is the trash button
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Invokes the animation
        todo.classList.add("fall"); /*adds this class name to the .todo div container */
        //Waits for the transition to end then remove the now invisible .todo div
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
        removeLocalTodos(todo);
    }
    
    //if the element clicked is the check button
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed"); /*adds this class name to todo container and also returns true. Can use toggle to remove an existing classname by toggle("completed", false) */
    }   
}

function filterTodo(event){
    const todos = [...todoList.children]; /*returns all the .todo divs nodes within the ul tag as a list. .children returns an HTMLCollection which is not a normal array which you can loop through, you need to convert it to the simple array, to do this, use spread operator (...)*/
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed"))
                    todo.style.display = "flex"; /*changes from the display:flex set in style.css for .todo divs to this style */
                else
                    todo.style.display = "none";
                break;
            case "incompleted":
                if(todo.classList.contains("completed"))
                    todo.style.display = "none"; /*changes from the display:flex set in style.css for .todo divs to this style */
                else
                    todo.style.display = "flex";
                break;
        }
    });
}

function saveLocalTodos(todo){ 
    //Check - if there exist a todo list  
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = []; //if not create a new todo list array
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos")); //returns the todos JSON string as an array
    }

    todos.push(todo); //pushes the new todoInput.value to this todos array
    localStorage.setItem("todos", JSON.stringify(todos));  //send the new array back to local storage as JSON string
    //localStorage.clear(); deletes all data in local storage location
}


function getTodos(){ //checks if theres a existing todo list in local storage and displays it
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = []; //if not create a new todo list
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos")); //returns the todos JSON string as an array
    }
    todos.forEach(function(todo){
        //Todo div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo"); /* classList allows to add or remove classes without affecting the other classes of the element. className will wipe out any existing classes while adding the new one*/

        //Create li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        //Check mark button
        const completedButton = document.createElement("button");
        completedButton.classList.add("complete-btn");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);

        //Check trash button
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo){ //todo is the .todo div container
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = []; //if not create a new todo list
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos")); //returns the todos as an array
    }
    const todoIndex = todo.children[0].innerText; //return the text of the list item which is the first child of the todo div
    todos.splice(todos.indexOf(todoIndex), 1); //Syntax: array.splice(index, howmany) - removes items from an array
    localStorage.setItem("todos", JSON.stringify(todos));
}