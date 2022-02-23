/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/


displayUsers();


function displayUsers() {      
    httpGet('/api/users/allUser')
        .then(response => (response.json()))
        .then((response) => {    
            console.log(response)        
            var allUsers = response.users;            
            console.log(response)
            // Empty the anchor
            var allUsersAnchor = document.getElementById('all-users-anchor');
            allUsersAnchor.innerHTML = '';
            // Append users to anchor
            allUsers.forEach((user) => {
                allUsersAnchor.innerHTML += getUserDisplayEle(user);
            });
        })
};


function getUserDisplayEle(user) {
    return `<div class="user-display-ele">

        <div class="normal-view">
            <div>Name: ${user.name}</div>
            <div>Email: ${user.email}</div>
            <button class="edit-user-btn" data-user-id="${user.id}">
                Edit
            </button>
            <button class="delete-user-btn" data-user-id="${user.id}">
                Delete
            </button>

            <button class="submit-addseries" data-user-id="${user.id}">
                Add Series
            </button>
            <button class="submit-addchannels" data-user-id="${user.id}">
            Add Channels
            </button>
            

        </div>
        
        <div class="edit-view">
            <div>
                Name: <input class="name-edit-input" value="${user.name}">
            </div>
            <div>
                Email: <input class="email-edit-input" value="${user.email}">
            </div>
            <button class="submit-edit-btn" data-user-id="${user.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-user-id="${user.id}">
                Cancel
            </button>
        </button>
            
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#add-user-btn')) {
        addUser();
    } else if (ele.matches('.edit-user-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-user-btn')) {
        deleteUser(ele);
    }
    else if (ele.matches('.submit-addseries')) {
        addSeries()
    }
    else if (ele.matches('.submit-addchannels')) {
        addChannels()
    }
}, false)


function addUser() {
    var nameInput = document.getElementById('name-input');
    var emailInput = document.getElementById('email-input');
    var data = {
        user: {
            name: nameInput.value,
            email: emailInput.value
        },
    };
    httpPost('/api/users/add', data)
        .then(() => {
            console.log("Added")
            displayUsers();
        })
}

function addSeries() {
    data = {
        series: {
            name: "Two Broke Girls",
            episodes: [
                {
                    name: "The begining"
                },
                {
                    name: "The strike of bad luck"
                },
                {
                    name: "Two Odd pairs"
                },
                {
                    name: "Bonding"
                }

            ]
        }
    }
    httpPost('/api/series/add', data)
        .then(() => {
            console.log("Posted")
        })
}

function addChannels() {
    data = {
        channel: {
            name: "HBO",
            number: "21",
            events: [
                {
                    name: "Hollow Man"
                },
                {
                    name: "Mission Impossible"
                },
                {
                    name: "The Pianist"
                },
                {
                    name: "Executive Decision"
                }

            ]
        }
    }
    httpPost('/api/channels/add', data)
        .then(() => {
            console.log("Posted")
        })
}

function showEditView(userEle) {
    var normalView = userEle.getElementsByClassName('normal-view')[0];
    var editView = userEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit(userEle) {
    var normalView = userEle.getElementsByClassName('normal-view')[0];
    var editView = userEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit(ele) {
    var userEle = ele.parentNode.parentNode;
    var nameInput = userEle.getElementsByClassName('name-edit-input')[0];
    var emailInput = userEle.getElementsByClassName('email-edit-input')[0];
    var id = ele.getAttribute('data-user-id');
    var data = {
        user: {
            name: nameInput.value,
            email: emailInput.value,
            id: id
        }
    };
    httpPut('/api/users/update', data)
        .then(() => {
            displayUsers();
        })
}


async function deleteUser(ele) {
    var user_id = ele.getAttribute('data-user-id');
    var User;
    var data = {
        user: {            
            id: user_id,
            name:"",
            email:"",
        }
    };
    console.log(data)
    await httpPost('/api/users/User', data)
        .then(response => (response.json()))
        .then((response) => {                         
            User = response.users[0];            
            console.log(response.users[0].name)        
    
        })    
    data.user.name = User.name;
    data.user.email = User.email;  
    httpDelete('/api/users/delete', data)
        .then(() => { 
            console.log("deleted")
            displayUsers();
        })
}


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}


function httpDelete(path, data) {
    return fetch(path, getOptions('DELETE', data));
}


function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}

