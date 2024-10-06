async function adduser(event) {
    event.preventDefault();
    console.log("reached here...");

    let name = document.getElementById("name").value;
    console.log("name:", name);

    let email = document.getElementById("email").value;
    console.log("email:", email);

    let pass = document.getElementById("pass").value;
    console.log("password:", pass);


    let nameerr = document.getElementById("name-err");
    let emailerr = document.getElementById("email-err");
    let passerr = document.getElementById("pass-err");


    let namereg = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passreg = /^.{6,}$/;

    nameerr.innerHTML = '';
    emailerr.innerHTML = '';
    passerr.innerHTML = '';

    // validation at client side
    if (!name && !email && !pass) {
        nameerr.innerHTML = "name is required!";
        emailerr.innerHTML = "email is required!";
        passerr.innerHTML = "password is required!"
    }

    if (!name) {
        nameerr.innerHTML = "name is required!";
        return;

    }
    else if (!namereg.test(name)) {
        nameerr.innerHTML = "invalid name!"
        return;


    }

    if (!email) {
        emailerr.innerHTML = 'email is required!';
        return;
    }
    else if (!emailreg.test(email)) {
        emailerr.innerHTML = "invalid email!";
        return;
    }

    if (!pass) {
        passerr.innerHTML = 'password required!'
        return;
    }
    else if (!passreg.test(pass)) {
        passerr.innerHTML = "password must contain 6 characters!"
        return;
    }





    let datas = {
        name,
        email,
        password: pass

    };

    console.log("datas:", datas);
    let json_data = JSON.stringify(datas);
    console.log("json_data:", json_data);

    let response = await fetch("/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json_data
    });
    console.log("response:", response);

    if(response.ok){
        window.location.href = "getallusers.html";
    }

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);

    if (parsed_response) {
        alert(parsed_response);
       

    }
    else {
        alert("something went wrong");
    }

}


let newfetch = fetch("http://localhost:3001/users", {
    method: "GET"
})
    .then((response) => {
        console.log("new response:", response);
        return response.json();

    })
    .then((datas) => {
        console.log("datassss", datas);
        let tbody = document.getElementById('tbody');
        let content = '';
        for (i = 0; i < datas.length; i++) {
            content = content + `
            <tr>
            <td>${datas[i].name}</td>
            <td>${datas[i].email}</td>
            <td>${datas[i].password}</td>
            <td><button class="btn" onclick="sendid('${datas[i]._id}')">view</button>
            <tr>`


        }
        tbody.innerHTML = content;
    })
    .catch((error) => {
        console.log(error);
    })



function sendid(id) {
    console.log("button clicked..")
    console.log("id:", id);
    window.location.href = `getsingleuser.html?id=${id}`
}


async function loaddata() {

    let location = window.location;
    console.log("location :", location);

    let querystring = location.search;
    console.log("querystring :", querystring);

    let queryparams = new URLSearchParams(querystring);
    console.log("queryparams :", queryparams);

    let id = queryparams.get("id");
    console.log("id :", id);

    let response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": id })
    })
    console.log("response:", response);

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);
    let json_response = JSON.parse(parsed_response);
    console.log("name:", json_response.name);

    let viewuser = document.getElementById("viewuser");
    let content = `
 <div class="img-div"><img src="./images/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" alt=""></div>
 <div class="line"></div>
 <div class="text-div"><h4 class="muted">Name</h4> <h4>${json_response.name}</h4></div>
 <div class="text-div"><h4 class="muted">Email</h4> <h4>${json_response.email}</h4></div>
 <div class="text-div"><h4 class="muted">Password</h4> <h4>${json_response.password}</h4></div>
 <div class="btn-div"><span><button class="btn1" onclick = 'senduserdata("${json_response._id}")'>Edit</button></span>
 <span><button id="red-btn" class="btn1" onclick ='deletedata("${json_response._id}")'>Delete</button></span></div>`

    viewuser.innerHTML = content;



}

function senduserdata(id) {
    console.log("editdata button clicked...")
    console.log("id:", id);
    window.location.href = `edituser.html?id=${id}`

}

async function edituser() {
    let location = window.location;
    console.log("location :", location);

    let querystring = location.search;
    console.log("querystring :", querystring);

    let queryparams = new URLSearchParams(querystring);
    console.log("queryparams :", queryparams);

    let id = queryparams.get("id");
    console.log("id :", id);

    let response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": id })
    })
    console.log("response:", response);

    let parsed_response = await response.text();
    console.log("parsed response:", parsed_response);
    let json_response = JSON.parse(parsed_response);
    console.log("json_response", json_response);

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('pass');
    name.value = json_response.name;
    email.value = json_response.email;
    password.value = json_response.password;


}


async function updateuser(event) {
    event.preventDefault();
    console.log("reached here...");

    let location = window.location;
    console.log("location :", location);

    let querystring = location.search;
    console.log("querystring :", querystring);

    let queryparams = new URLSearchParams(querystring);
    console.log("queryparams :", queryparams);

    let id = queryparams.get("id");
    console.log("id :", id);

    let name = document.getElementById("name").value;
    console.log("name:", name);

    let email = document.getElementById("email").value;
    console.log("email:", email);

    let pass = document.getElementById("pass").value;
    console.log("password:", pass);


    let nameerr = document.getElementById("name-err");
    let emailerr = document.getElementById("email-err");
    let passerr = document.getElementById("pass-err");


    let namereg = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passreg = /^.{6,}$/;

    nameerr.innerHTML = '';
    emailerr.innerHTML = '';
    passerr.innerHTML = '';

    // validation at client side
    if (!name && !email && !pass) {
        nameerr.innerHTML = "name is required!";
        emailerr.innerHTML = "email is required!";
        passerr.innerHTML = "password is required!"
    }

    if (!name) {
        nameerr.innerHTML = "name is required!";
        return;

    }
    else if (!namereg.test(name)) {
        nameerr.innerHTML = "invalid name!"
        return;


    }

    if (!email) {
        emailerr.innerHTML = 'email is required!';
        return;
    }
    else if (!emailreg.test(email)) {
        emailerr.innerHTML = "invalid email!";
        return;
    }

    if (!pass) {
        passerr.innerHTML = 'password required!'
        return;
    }
    else if (!passreg.test(pass)) {
        passerr.innerHTML = "password must contain 6 characters!"
        return;
    }




    let datas = {
        id,
        name,
        email,
        pass

    };

    console.log("datas:", datas);
    let json_data = JSON.stringify(datas);
    console.log("json_data:", json_data);

    let response = await fetch("http://localhost:3001/user", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json_data
    })
    console.log("response:", response);

    let text_response = await response.text();
    console.log("text_response:", text_response);

    if (text_response) {
        alert(text_response);
        return;
    }
    else {
        alert('something went wrong');
    }

}

// delete data
async function deletedata(id) {

    console.log("id:", id);


    let response = await fetch("http://localhost:3001/user", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": id })
    })
    console.log("response:", response);

    let text_response = await response.text();

    if(response.ok){
        window.location.href = "getallusers.html";
    }

    if (text_response) {
        alert(text_response);
        return;
    }
    else {
        alert('something went wrong');
    }



}


async function login(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById("pass").value;

    let datas = {
        email,
        password
    }

    console.log("datas from login :",datas);
    let json_data = JSON.stringify(datas);

    let response = await fetch ("http://localhost:3001/login",{
        method : 'POST',
        headers :{
            "Content-Type" : "application/json", 
            'Authorization': `Bearer ${data}`
        },
        body : json_data
    })

    console.log("response of login:",response);
    
    if(response.ok){
        let parsed_response = await  response.json();
        console.log("parsed_response :",parsed_response);
        console.log("data :",parsed_response.data);

        // saving token into browsers local storage
        localStorage.setItem('authToken',parsed_response.data);
    }
    else{
        console.log("response :",response.statusText);
    }



    
}



