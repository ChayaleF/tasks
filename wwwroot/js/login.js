const uri = "https://localhost:7188/Login";

const dom = {
    name: document.getElementById("name"),
    password: document.getElementById("password"),
    submitBtn: document.getElementById("submit")
}

dom.submitBtn.onclick = (event) => {
    event.preventDefault();

    console.log("1");
    const item = { name: dom.name.value, password: dom.password.value }

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(item)
    })
        .then((response) => 
            response.json()
           
        )
        .then((data) => {
            console.log("wetry" + data);
            console.log("dfg" + data.body);
            let status = data.body?.status.value
            if (status == undefined)
                localStorage.setItem("token",data )
            else {
                console.log("error!!!!!!!!!!!!");
                localStorage.setItem("token", "q")

            }
            console.log("wetry");

            location.href = "../index.html"
        })
        .catch(error => console.error('Unable to add item.', error));
}


// localStorage.setItem;
