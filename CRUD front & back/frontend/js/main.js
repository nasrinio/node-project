var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productDesc = document.getElementById("productDesc")

var products = [];

function getProduct() {
    fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(data => {
            products = data.products
            console.log(products);
            display()
        })
}
getProduct()

function display() {

    let box = ''
    for (let i = 0; i < products.length; i++) {
        box += ` <tr>
        <td>${i + 1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].description}</td>
        <td>
            <button  onclick="updateInfo(${i},${products[i].id})" class="btn btn-outline-success">update</button>
            <button onclick="deleteData(${products[i].id})" class="btn btn-outline-danger">delete</button>
        </td>
    </tr>`
    }

    document.getElementById("tbody").innerHTML = box

}

function sendData() {
    let data = {
        name: productName.value,
        price: productPrice.value,
        description: productDesc.value,
    }
    api("POST", data)
    clearData()
}
function deleteData(id) {

    api("DELETE", { id })

}


var input;

function updateInfo(i, id) {
    input = id
    productName.value = products[i].name
    productPrice.value = products[i].price
    productDesc.value = products[i].description
    document.getElementById("add").style.display = "none"
    document.getElementById("update").style.display = "block"

}

function updateData() {
    let data = {
        id: input,
        name: productName.value,
        price: productPrice.value,
        description: productDesc.value
    }
    api('PUT', data)
    document.getElementById("add").style.display = "block"
    document.getElementById("update").style.display = "none"
    clearData()
}

function api(method, data) {
    fetch(`http://localhost:3000/`, {

        method,
        body: JSON.stringify(data),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        .then(response => response.json())

        .then(result => {
            if (result.msg == 'success') {
                getProduct()
            }
        });
}


function clearData() {
    productName.value = ''
    productPrice.value = ''
    productDesc.value = ''
}
