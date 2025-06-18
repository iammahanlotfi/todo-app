const taskInput = document.getElementById("task-input") ;
const dateInput = document.getElementById("date-input") ; 
const addButton = document.getElementById("add-button") ; 
const alertMessage = document.getElementById("alert-message") ; 
const todosBody = document.querySelector("tbody") ; 
const deleteAllbutton = document.getElementById("delete-all-button") ; 

let todos = JSON.parse(localStorage.getItem("todos")) ; 

if(todos === null) { 
    todos = [] ; 
}

const generateID = () => { 
    const id = Math.round(Math.random() * Math.random() * Math.pow(10 , 10)).toString() ; 
    return(id) ; 
};


const showAlert  = (message , type) => { 
    alertMessage.innerHTML  = "" ; 
    const alert = document.createElement("p") ; 
    alert.innerText = message ; 
    alert.classList.add("alert") ; 
    alert.classList.add(`alert-${type}`) ;

    alertMessage.append(alert) ; 

    setTimeout(()=> { 
        alert.style.display = "none" ; 
    } , 2500)

} ; 

const saveToLocalStorage = ()=> { 
    localStorage.setItem("todos" , JSON.stringify(todos)) ; 
}; 

const displayTodos = () => { 
    todosBody.innerHTML = "" ; 

    if(!todos.length) { 
        todosBody.innerHTML = "<tr>\
        <td colspan = '4'>\
        No task found.\
        </td>\
        </tr>";
        
        return;
    }
    else { 
        todos.forEach(todo => {
            todosBody.innerHTML += `
            <tr>
                <td>${todo.task}</td> 
                <td>${todo.date ? todo.date : "No date."}</td> 
                <td>${todo.completed ? "Completed" : "Pending"} </td> 
                <td>
                    <button>Edit</button>
                    <button onclick = "statusHandler('${todo.ID}')">${todo.completed ? "Undo" : "Do"}</button>
                    <button onclick = "deleteHandler('${todo.ID}')">Delete</button>
                </td>     
            `          
        });
    }
} ; 

const addHandler = ()=> {
    
    const task = taskInput.value.toLowerCase().trim(); 
    const date = dateInput.value.toLowerCase().trim();
    const todo = {
        'ID' : generateID() , 
        'task' : task ,
        'date' : date ,
        'completed' : false
    };
    if (task==="") {

        showAlert("Please enter a todo!" , "error") ; 
    }
    else { 
        todos.push(todo) ;
        saveToLocalStorage();
        displayTodos() ; 
        taskInput.value = "" ;
        dateInput.value = "" ; 
    
        showAlert("Todo added successfully!" , "success") ;  
    }
}; 

const deleteAllHandler = () => {
    if(todos.length) {

        todos = [] ; 
        localStorage.clear() ;
        displayTodos() ;
        showAlert("All todos deleted successfully." , "success") ; 
    }
    else { 
        showAlert("No todo to delete." , "error") ; 
    }
}


const deleteHandler = (id) => { 
    const newTodos = todos.filter((todo) => todo.ID !== id);
    todos = newTodos ; 
    saveToLocalStorage() ; 
    displayTodos() ; 
    showAlert("Todo deleted successfully." , "success") ; 
    
}

const statusHandler = (id) => {
    
    todos.forEach((todo) => { 
        if(id === todo.ID) { 
            if(todo.completed === false) { 
                todo.completed = true ; 
            }
            else { 
                todo.completed = false ; 
            }
        }
    })
    
    saveToLocalStorage();
    displayTodos();   
    showAlert("Todo status changed successfully." , "success");
}

window.addEventListener("load" , displayTodos) ; 
addButton.addEventListener("click" , addHandler) ; 
deleteAllbutton.addEventListener("click" , deleteAllHandler) ; 
