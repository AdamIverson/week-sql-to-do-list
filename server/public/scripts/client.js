$(document).ready(onReady);

function onReady() {
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
    
}