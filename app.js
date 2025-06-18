const taskInput = document.getElementById("task-input") ;
const dateInput = document.getElementById("date-input") ; 
const addButton = document.getElementById("add-button") ; 
const alertMessage = document.getElementById("alert-message") ; 
let ID = 0 ; 

let todos = JSON.parse(localStorage.getItem("todos")) ; 

if(todos === null) { 
    todos = [] ; 
}

console.log(todos) ;


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
        taskInput.value = "" ;
        dateInput.value = "" ; 
        console.log(todos) ;
        
        showAlert("Todo added successfully!" , "success") ;  
    }
}; 

addButton.addEventListener("click" , addHandler) ; 