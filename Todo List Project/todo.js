// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0]; //0. indeksini almak istedik
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tüm event listenerlar burada olacak atama yapacak 
    form.addEventListener("submit",addTodo); //submit olayında addtodo'yu çalıştırması için eventlistener attık 
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
        // Arayüzden todoları temizleme
        // todoList.innerHTML = ""; // Yavaş
        while(todoList.firstElementChild != null) {
            //null olmadığı sürece devam edecek ve tüm çocuklar silinecek
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
    
    
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            // Bulamadığı zaman -1 dönderecek
            
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
   }
);


}
function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success","Todo başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // Arrayden değeri silebiliriz.
        }

    }
);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    }
)

}
function addTodo(e){
    const newTodo = todoInput.value.trim(); //trim() başındaki ve sonundaki boşlukların silinmesi için kullanılır 
    
    if (newTodo === "") { 
        //boşsa ekleme yapılmadan uyarı çıkması için 
        showAlert("danger","Lütfen bir todo girin...");
    }
    else {
        addTodoToUI(newTodo); 
        addTodoToStorage(newTodo);

        showAlert("success","Todo başarıyla eklendi...");

    }
   e.preventDefault();

}


function getTodosFromStorage(){ // Storagedan Todoları Alma
    let todos;
    //todos keyi yoksa null dönderecek  
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        //string olarak yazılır bizim bunu array'e çevirmemiz gerektis
    }
    return todos;


}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    //gönderilen dtringi ekledik 
    todos.push(newTodo);
    //güncelledik ve çevirdik
    localStorage.setItem("todos",JSON.stringify(todos));



}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeout
    // alertin 1 saniye sonra silinmesini sağladık

    setTimeout(function(){alert.remove();},1000);

}
function addTodoToUI(newTodo){ // String değerini list item olarak UI'ya ekleyecek 
   // List Item Oluşturma dinamik olarak element üretceğiz
   const listItem = document.createElement("li");
   // Link oluşturma
   const link = document.createElement("a");
   link.href = "#";
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";

   listItem.className = "list-group-item d-flex justify-content-between";

   // Text Node Ekleme

   listItem.appendChild(document.createTextNode(newTodo));
   listItem.appendChild(link);

   // Todo List'e List Item'ı ekleme

   todoList.appendChild(listItem);
   todoInput.value = ""; //yazıp listeye ekledikten sonra boşaltmak için 


   


}



