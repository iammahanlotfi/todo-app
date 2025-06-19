const taskInput = document.getElementById("task-input") ;
const dateInput = document.getElementById("date-input") ; 
const addButton = document.getElementById("add-button") ; 
const alertMessage = document.getElementById("alert-message") ; 
const todosBody = document.querySelector("tbody") ; 
const deleteAllbutton = document.getElementById("delete-all-button") ; 
const editButton = document.getElementById("edit-button") ;  

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
                    <button onclick = "editHandler('${todo.ID}')">Edit</button>
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


// const task = taskInput.value.toLowerCase().trim(); 


const editHandler = (id) => {

    const todo = todos.find((todo) => todo.ID === id ) ; 
    taskInput.value = todo.task ; 
    dateInput.value = todo.date ;
    addButton.style.display = "none";
    editButton.style.display = "inline-block";
    editButton.dataset.id = id ;
    
}

const applyEdit  = (event)=> { 
    
    const todo = todos.find((todo) => todo.ID === event.target.dataset.id) ;
    todo.task = taskInput.value;
    todo.date = dateInput.value;
    saveToLocalStorage();
    displayTodos();
    showAlert("Todo edited successfully." , "success") ;
    taskInput.value = "";
    dateInput.value = "";
    editButton.style.display = "none";
    addButton.style.display = "inline-block";

}


window.addEventListener("load" , displayTodos) ; 
addButton.addEventListener("click" , addHandler) ; 
deleteAllbutton.addEventListener("click" , deleteAllHandler) ; 
editButton.addEventListener("click" , applyEdit);
