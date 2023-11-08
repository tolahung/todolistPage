// Save data function (save to localstorage)

let TODOLIST_APP_UNITOP = 'TODOLIST_APP_UNITOP';


// demo data 
let data = [
    {
        task: 'readingbook',
        is_complete: true,
    },

];

// saveData(data);
const saveData = (data)=>{
    localStorage.setItem(TODOLIST_APP_UNITOP, JSON.stringify(data));
};

// get data function
const loadData = ()=>{
    let data = JSON.parse(localStorage.getItem(TODOLIST_APP_UNITOP));
    data = data?data:[];
    return data;
};

// create add function to add data to localStorage
    let add = (new_task)=>{
        let data;
        data = loadData();
        data.push(new_task);
        saveData(data);
    }

//markTask function hàm này trong onclick ở thẻ <p> tạo gạch ngang chữ
    const markTask = (index)=>{
        let data;
        data = loadData();
        data[index].is_complete = data[index].is_complete==false?true:false;
        saveData(data); 
        render();
        // console.log(data[index]);
    }

// Create function (Hàm này tạo ra để giúp hàm render đỡ rối vì ta sẽ gọi lại hàm này trong render)
const create = (task, is_complete,index)=>{
    return `
        <li index=${index} is_complete = ${is_complete}>
            <p onclick="markTask(${index})">${task}</p>
            <div class="option">
                <i onclick= "editTask(${index})" class='bx bx-pencil'></i>
                <i onclick= "deleteTask(this,${index})" class='bx bxs-trash'></i>
            </div>
        </li>   
    `;
};

// Render data function
const render = ()=>{
    let data, showData, ultask, countComplete;
    countComplete = document.querySelector('.completed');
    ultask = document.querySelector('ul.list-task');
    data = loadData();
    let count = 0;
    showData = data.map((element,index)=>{
        if(element.is_complete == true){ //Phần if này là để reder xuất lên phần task đã hoàn thành
            count++;
        }
        return create(element.task, element.is_complete, index);
    });
    countComplete.innerHTML = `<p>Yeah, ${count} Task completed</p>`;
    ultask.innerHTML = showData.join("");
}


//delete function 
const deleteTask = (element, index)=>{
    
    let delete_cf = confirm('Are you sure to delete this ?')
    if(delete_cf == false){
        return false;
    }
    let data;
    data = loadData();
    data.splice(index, 1);
    saveData(data);
    render();
};


//Edit function
const editTask = (index)=>{
    // console.log(index);
    const task = document.querySelector('#Name');
    const btn = document.querySelector('button');
    let data;
    task.setAttribute('index', index);
    data = loadData();
    task.value = data[index].task;
    btn.innerText = 'EDIT TASK';
};

const saveEditTask = (task,index)=>{
    const btn = document.querySelector('button');
    let data = loadData();
    data[index].task = task;
    btn.innerHTML = 'ADD TASK';
    saveData(data);
}

// event when submit
const formAddTask = document.forms.add_task;
formAddTask.addEventListener('submit', (e)=>{
    const task = document.querySelector('#Name');
    const index = task.getAttribute('index');
    if(task.value.length < 2){
        alert('Enter your task');
        return false;
    }
    if(index){
        saveEditTask(task.value, index);
        task.removeAttribute('index');
    } else{
        let new_task = {
            task: task.value,
            is_complete : false
        }
        add(new_task);
    }
    
    render();
    task = ''; // công dụng giúp khi submit trên thanh tìm kiếm trở lại trạng thái rỗng 
    // console.log(loadData());
    e.preventDefault();
});

// tạo form người dùng thoát ra khi khong muốn edit: 
document.addEventListener('keyup', (e)=>{
    const task = document.querySelector('#Name');
    const btn = document.querySelector('button');
    if(e.which == 27){
        task.value = '';
        btn.innerText = 'ADD TASK'
        task.removeAttribute('index');
    }
});

render();





