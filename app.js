const taskInput = document.getElementById("task-input") ;
const dateInput = document.getElementById("date-input") ; 
const addButton = document.getElementById("add-button") ; 
const alertMessage = document.getElementById("alert-message") ; 
const todosBody = document.querySelector("tbody") ; 

let ID = 0 ; 

let todos = JSON.parse(localStorage.getItem("todos")) ; 

if(todos === null) { 
    todos = [] ; 
}



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

}

const saveToLocalStorage = ()=> { 
    localStorage.setItem("todos" , JSON.stringify(todos)) ; 
}

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
                    <button>Do</button>
                    <button>Delete</button>
                </td>     
            `          
        });
    }
}
displayTodos() ;

const addHandler = ()=> {
    ID = ID + 1 ; 
    const task = taskInput.value.toLowerCase().trim(); 
    const date = dateInput.value.toLowerCase().trim();
    const todo = {
        'ID' : ID , 
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

addButton.addEventListener("click" , addHandler) ; 