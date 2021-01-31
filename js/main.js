function getEle(id) {
    return document.getElementById(id);
}
var isLoading = false;
var taskService = new TaskService();
var validation = new Validation();

// check Loading Function
function checkLoading(isLoading) {
    if (isLoading) {
        getEle('loader').style.display = "block";
    } else {
        getEle('loader').style.display = "none";
    }
}

// Lay danh sach tu sever 
function getTaskListFromServer(callback) {
    checkLoading(true);
    taskService.getTaskList()
        .then(function (result) {
            renderList(result.data);
            checkLoading(false);
            callback(result.data);
        })
        .catch(function (err) {
            console.log(err);
        });
}
//render task list từ server
getTaskListFromServer();

// AddTask 
getEle('addItem').addEventListener("click", function () {
    getTaskListFromServer(addTasktoServer);
})

//Add Task to User // Button onclick
function addTasktoServer(arrSever) {
    var _taskName = getEle('newTask').value;
    var _taskStatus = "todo";
    var newTask = new Task(_taskName, _taskStatus);
console.log(arrSever)
    var isValid = true;
    isValid &= validation.checkEmpty(newTask.taskName, "notiInput", 0) && validation.checkTaskExisted(newTask.taskName, "notiInput", 0, arrSever);

    if (isValid) {
        checkLoading(true);
        taskService.addTasktoServer(newTask)
            .then(function (result) {
                console.log(result.data);
                checkLoading(false);
                alert("Task is added successully");
                clear();
                getTaskListFromServer();
            })
            .catch(function (err) {
                console.log(err);
            })
    }
}

// Create task in HTML
function createTask(newTask) {
    return `
        <li>
                   <span>${newTask.taskName}</span>
                   <div class="buttons">
                    <button class="remove" onclick="deleteToDo(${newTask.id})"><i class="fa fa-trash-alt"></i></button>
                    <button class="complete" onclick="changeStatus(${newTask.id})"><i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i></button>
                   </div>
                                     
                   </li>
    `;
}

function renderList(arr) {
    var todo = "";
    var completed = "";

    for (i = 0; i < arr.length; i++) {
        if (arr[i].taskStatus === "completed") {
            completed += createTask(arr[i]);
        } else {
            todo += createTask(arr[i]);
        }
    }
    getEle('completed').innerHTML = completed;
    getEle('todo').innerHTML = todo;

}

// Delete Task 
function deleteToDo(id) {
    checkLoading(true);
    taskService.deleteTaskFromServer(id)
        .then(function (result) {
            renderList(result.data);
            checkLoading(false);
            getTaskListFromServer();
        })
        .catch(function (err) {
            console.log(err);
        })
}

// Change Status
function changeStatus(id) {
    taskService.getTaskbyId(id)
        .then(function (result) {
            if (result.data.taskStatus === "completed") {
                result.data.taskStatus = "todo";
            } else {
                result.data.taskStatus = "completed";
            }
            updateTask(id, result.data);

        })
        .catch(function (err) {
            console.log(err);
        })

}
//Update Task to Server
function updateTask(id, task) {
    checkLoading(true);
    taskService.updateTask(id, task)
        .then(function (result) {
            getTaskListFromServer(); 
        })
        .catch(function (err) {
            console.log(err);
        })

}   
function clear() {
 var new_ = getEle("newTask").value;
return  new_.innerHTML ="";
}