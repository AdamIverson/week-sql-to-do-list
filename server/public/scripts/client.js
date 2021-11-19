$(document).ready(onReady);

function onReady() {
    renderTasks();
    $('#submit-btn').on('click', addTask);
    $("#tasksTableBody").on('click', '.table-complete', completeTask);
    $("#tasksTableBody").on('click', '.table-delete', deleteTask);
}

function addTask() {
    console.log('click submit');
    console.log('in addTask');
    
    const newTask = {
        task: $('#task-in').val(),
        completed: false
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
                <td><button class="table-complete" data-id="${task.id}">COMPLETE</buton></td>
                <td><button class="table-delete" data-id="${task.id}">DELETE</button></td>
            </tr>
        `);
        }
    });
}

function completeTask() {
    const taskToComplete = $(this).data('id');
    const currentStatus = $(this).data('status');

    console.log('taskToComplete', taskToComplete);
    console.log('currentStatus', currentStatus);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskToComplete}`,
        data: { completed: currentStatus }
    }).then((res) => {
        renderTasks();
    }).catch((err) => {
        console.error(err);
    })
}

function deleteTask() {
    const taskIdToDelete = $(this).data('id');
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskIdToDelete}`
    }).then((response) => {
        console.log(response);
        renderTasks();
    })
};