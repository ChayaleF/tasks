const uri = "https://localhost:7188/Tasks";
//const uri = '..Tasks' אפשר גם:
let users = [];

function checkToken() {
    fetch(uri ,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`
        },

    })
        .then(response => response.json())
        .then(getItems())
        .catch(error => 
        {
            sessionStorage.setItem("check",error)
            console.log(error);
            location.href = "./login.html"

        });
        
}

function getItems() {
    fetch(uri ,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`
        },
    })
        .then(response => response.json())
        .then(data => _displayItems(data))
        // .catch(error => console.error('Unable to get items.', error));
        .catch(error => 
            {
                sessionStorage.setItem("check",error)
                console.log(error);
                location.href = "./login.html"
    
            });
            
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addPasswordTextbox = document.getElementById('add-password');

    const item = {
        
        name: addNameTextbox.value.trim(),
        password:addPasswordTextbox.value.trim()
    };

    fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addPasswordTextbox.value = '';

        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`
        },
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

// function displayEditForm(id) {
//     const item = tasks.find(item => item.id === id);

//     document.getElementById('edit-name').value = item.name;
//     document.getElementById('edit-id').value = item.id;
//     document.getElementById('editForm').style.display = 'block';
// }

// function updateItem() {
//     const itemId = document.getElementById('edit-id').value;
//     const item = {
//         id: parseInt(itemId, 10),
//         isDone: document.getElementById('edit-isDone').checked,
//         name: document.getElementById('edit-name').value.trim()
//     };

//     fetch(`${uri}/${itemId}`, {
//             method: 'PUT',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization':`Bearer ${localStorage.getItem("token")}`
//             },
//             body: JSON.stringify(item)
//         })
//         .then(() => getItems())
//         .catch(error => console.error('Unable to update item.', error));

//     closeInput();

//     return false;
// }

// function closeInput() {
//     document.getElementById('editForm').style.display = 'none';
// }

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'users' : 'users kinds';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('users');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        

        
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();
        let td1 = tr.insertCell(1);
        let textNodeName = document.createTextNode(item.name);
        td1.appendChild(textNodeName);
      

        let td2 = tr.insertCell(1);
        let textNodePassword = document.createTextNode(item.password);
        td2.appendChild(textNodePassword);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    users = data;
}


// if (localStorage.getItem("token") == null){
//     console.log("login");
//     sessionStorage.setItem("not","not exist token")

//     location.href = "./login.html"

// }
// sessionStorage.setItem("yes","exist token")
// console.log(localStorage.getItem("token"));
 getItems();