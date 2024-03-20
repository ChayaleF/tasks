const uri = "https://localhost:7188/Login";
console.log("in login");
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
        .then((res) => {

            if (res.status == 401)
                alert("The username or password you entered is incorrect")
            else {
                if (dom.name.value === "David" && dom.password.value === "123")
                    sessionStorage.setItem("link", true);
                else
                    sessionStorage.setItem("link", false);

                localStorage.setItem("token", res)
                location.href = "../index.html"
            }
        })
        .catch(error => console.error('Unable to add item.', error));
}
// localStorage.setItem;