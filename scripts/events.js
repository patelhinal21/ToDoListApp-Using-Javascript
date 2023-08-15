
//code to display all the tasks titles from json file using xhr 
const list = document.getElementById('list');
let tasks;
const load = (event) => {
    const target = event.target;
    if (target.status === 200) {
        const responseText = xhr.responseText;
        tasks = JSON.parse(responseText);
        tasks.forEach(task => {
            addList(task)
        })
    }
}
// appending expand and close button to the list
const addList = (listvalue) => {
    const item = document.createElement('div');
    item.textContent = "" + listvalue.title;
    item.id = 'value' + listvalue.id;
    list.appendChild(item);
    list.appendChild(addExpandBtn(listvalue));
    list.appendChild(completeBtn(listvalue));
    list.appendChild(addDetailNode(listvalue));

}
const xhr = new XMLHttpRequest();
xhr.open('GET', 'data/test.json');
xhr.addEventListener('load', load);
xhr.send();

//code to add an expand button to hide and view details 
addExpandBtn = (nodeData) => {
    const expandbtn = document.createElement('button');

    expandbtn.addEventListener("click", () => {
        const show = document.getElementById('detail' + nodeData.id)
        if (show.style.display == 'block') {
            show.style.display = 'none';
        }
        else {
            show.style.display = 'block';
        }
    });

    expandbtn.innerHTML = "View Details";
    expandbtn.classList = "addNewTodobtn";
    return expandbtn;
}
//code to add detaits apart from detail in div 
addDetailNode = (taskData) => {
    const dataNode = document.createElement('div');
    dataNode.style.display = 'none';
    dataNode.id = 'detail' + taskData.id;
    dataNode.innerText = "" + taskData.description + "\n \n" + taskData.due_date + "\n \n" + taskData.time;
    return dataNode;
};

//code to push new to-do task in the existing to-do list
onFormInput = () => {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const dueDate = document.getElementById('due_date').value;
    const dueTime = document.getElementById('time').value;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    dueTime.value = `${hours}:${minutes}`; 
    tasks.push({
        "title": title, "description": desc, "due_date": dueDate, "time": dueTime, "id": tasks.length + 1
    });
    list.innerHTML = "";
    tasks.forEach(task => {
        addList(task)
    })
}
//code to hide the form inputs on click of a button
addNewToDoItemBtn = () => {
    //write toggle code to view form
    const view = document.getElementById('form')
    if (view.style.display == 'block') {
        view.style.display = 'none';
    }
    else {
        view.style.display = 'block';
    }
}
//code to strike through the task when clicked on close button
completeBtn = (taskData) => {
    const compbtn = document.createElement('button');
    compbtn.addEventListener("click", () => {
        const show = document.getElementById('value' + taskData.id)
        if (taskData.status == 'close') {
            show.setAttribute("class", 'open');
            tasks[taskData.id - 1].status = 'open';
        }
        else {
            show.setAttribute("class", 'close');
            tasks[taskData.id - 1].status = 'close';
        }
    });

    compbtn.innerHTML = "Task Complete";
    compbtn.classList = "addNewTodobtn";
    return compbtn;
}





