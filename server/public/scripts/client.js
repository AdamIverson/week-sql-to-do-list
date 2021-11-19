$(document).ready(onReady);

function onReady() {
    renderTasks();
    $('#submit-btn').on('click', addTask);
}

function addTask() {
    console.log('click submit');
    console.log('in addTask');
    
    const newTask = {
        task: $('#task-in').val()
        }
        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: newTask
        }).then((response) => {
            console.log('POST /tasks succeeded')
            $('#task-in').val(''),
            renderTasks();
        });
}

function renderTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then((response) => {
        $("#tasksTableBody").empty();
        console.log("GET /songs response", response);
        for (let task of response) {
        $('#tasksTableBody').append(`
            <tr>
                <td>${task.task}</td>
                <td>${task.completed}</td>
                <td><button data-id="${task.id}">X</button></td>
            </tr>
        `);
        }
    });
}