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
    // if condition to require field
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
            if(task.completed) {
                $('#tasksTableBody').append(`
                <tr colspan="8" class="complete-row">
                <td class="text-success table-box complete" >${task.task}</td>
                <td class="table-box">COMPLETE</td>
                <td><button class="btn btn-danger table-delete table-box" data-id="${task.id}">DELETE</button></td>
                </tr>
                </div>
            `);  
            } else {
        $('#tasksTableBody').append(`
            <tr colspan="8" class="danger-row">
                <td  class="text-danger">${task.task}</td>
                <td class="complete-btn-center"><button type="button" class="btn btn-outline table-complete" data-id="${task.id}">COMPLETE</button></td>
                <td><button type="button" class="btn btn-outline btn-danger table-delete" data-id="${task.id}">DELETE</button></td>
            </tr>
        `);
        }
    };
})
}

function completeTask() {
    const taskToComplete = $(this).data('id');
    const currentStatus = $(this).data('status');
    Swal.fire('did u do it tho')

    console.log('taskToComplete', taskToComplete);
    console.log('currentStatus', currentStatus);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskToComplete}`,
        data: { completed: currentStatus }
    }).then((res) => {
        renderTasks();
        taskColor();
    }).catch((err) => {
        console.error(err);
    })
}

function taskColor() {
    $(this).addClass("text-success");
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