const inputElement = document.getElementById('taskInput');
const list = document.getElementById('taskList');

inputElement.addEventListener('keydown', function(event){

    if(event.key === 'Enter'){

        addTask();
    } else{}
});

const addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', function(event){

    addTask();
});

function addTask(){

    const taskText = inputElement.value;

    if(taskText.trim() === ''){
        alert('Please enter a task');
        return;
    } else{

        createElement(taskText, false);
    }

    inputElement.value = '';
    saveTasks();
}

function createElement(text, isCompleted){

    const taskText = text;
    console.log(taskText);

    if(taskText.trim() === ''){

        alert('Please enter a task');
        return;
    } else{

        const taskItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const actionButtons = document.createElement('div');
        const deleteItem = document.createElement('button');
        const editItem = document.createElement('button');
        const completeItem = document.createElement('input');
        completeItem.type = 'checkbox';
        deleteItem.textContent = '❌';
        editItem.textContent = '✏️';
        deleteItem.addEventListener('click', function(){

            list.removeChild(taskItem);
            saveTasks();
        });
        editItem.addEventListener('click', function(){

            const editedTextitem = prompt("Come Vuoi Modificare La Task?");
            if(editedTextitem !== null && editedTextitem.trim() !== ''){
                
                taskSpan.textContent = editedTextitem;
            }
            saveTasks();
        });
        completeItem.addEventListener('change', function(){

            if(completeItem.checked){

                taskSpan.style.textDecoration = 'line-through';
                taskSpan.style.color = 'gray';
            } else{

                taskSpan.style.textDecoration = 'none';
                taskSpan.style.color = 'black';
            }
            saveTasks();
        });

        completeItem.className = 'completeButton';
        taskSpan.className = 'todo-text';

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(actionButtons);
        actionButtons.appendChild(completeItem);
        actionButtons.appendChild(editItem);
        actionButtons.appendChild(deleteItem);
        list.appendChild(taskItem);
    }
}

function clearAllTasks(){

    const clearAllButton = document.getElementById('clearAllTasksButton')

    if(clearAllButton){

        clearAllButton.addEventListener('click', function(){
                    

            const confirm = prompt('Are You Sure You Want To Clear All Tasks? Type "Yes" To Confirm!');
            if(confirm === "Yes" || confirm === "yes"){

                list.innerHTML = '';
                saveTasks();
            } else{}
        });
        
    }
}

function saveTasks(){

    const tasks = [];
    const taskItems = list.querySelectorAll('li');
    
    taskItems.forEach(function(taskItem){

        const taskSpan = taskItem.querySelector('.todo-text');
        const checkbox = taskItem.querySelector('.completeButton');
        
        tasks.push({

            text: taskSpan.textContent,
            completed: checkbox.checked
        });
    });
    
    localStorage.setItem('myTodoList', JSON.stringify(tasks));
}

function loadTasks(){

    const savedTasks = localStorage.getItem('myTodoList');
    if (!savedTasks) return;
    
    const tasks = JSON.parse(savedTasks);
    
    tasks.forEach(function(task){
        
        createElement(task.text, task.completed);
    });
}

loadTasks();
clearAllTasks();
