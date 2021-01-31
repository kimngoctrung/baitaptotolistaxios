function TaskService() {
    // Load Task List From Server
    this.getTaskList = function () {
        return axios({
            url: "https://6006df463698a80017de235f.mockapi.io/trung",
            method: "GET",
        });
    };

    //Add Task to Server
    this.addTasktoServer = function (task) {
        return axios({
            url: "https://6006df463698a80017de235f.mockapi.io/trung",
            method: "POST",
            data: task,
        });
    };

    //Delete Task
    this.deleteTaskFromServer = function (id) {
        return axios({
            url: `https://6006df463698a80017de235f.mockapi.io/trung/` + id,
            method: "DELETE",
        });
    }
    //Update Task Or Change Status
    this.updateTask = function (id, task) {
        return axios({
            url: `https://6006df463698a80017de235f.mockapi.io/trung/` + id,
            method: "PUT",
            data: task,
        });
    }

    //get Task By ID

    this.getTaskbyId = function (id) {
        return axios({
            url: `https://6006df463698a80017de235f.mockapi.io/trung/` + id,
            method: "GET",
        });
    }
}

