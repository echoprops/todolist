/*
code = function (selector) {
    if (!selector) {
        throw new Error('Erro: Argumento \'selector\' está vazio');
    } else {
        selectorItems = document.querySelectorAll(selector);
        if (selectorItems.length < 1) {
            throw new Error("Erro: O seletor usado no argumento não foi encontrado");
        } else {
            return new {
                render: () => {
                    
                    // *  render() irá transformar JSON em HTML
                    // *  Exemplo:
                    // *  let = element = {tagName: 'button', innerText: 'ClickMe', onClick: 'test()'} }
                    // *  code(sel).render(element);
                    // *  returns: <button onclick="test()">ClickMe</button>
                }
            };
        }
    }
}
*/

function addItem(obj, key, value) {
    if (typeof obj != "object" || typeof key != "number" || typeof value != "string") {
        throw new Error("Erro os atributos do addItem() estão com os tipos primitivos incompatíveis ou incorretos.");
    } else {
        obj [key] = value;
    }
}

let genListFromArray = function (arr) {
    let content = ""
    for (let index = 0; index < arr.length; index++) {
        content += `<li id="item-number-${index}">${arr[index]} `
        + `<button onclick="removeItem(${index})">✖</button>`
        + `<button onclick="editItem(${index})">Edit Value</button>`
        + `</li>`
        + `\n`;
    }
    return content;
}

let items = [];

let removeItem = (indexOfArr) => {
    items.splice(indexOfArr, 1);
    reload();
}

let editItem = (indexOfArr) => {
    let value = window.prompt("Put the new value:");
    if (!value || value.trim() == "") {
        alert("The entered value is empty");
    } else {
        items [indexOfArr] = value;
        reload();
    }
}

async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    loadData(data.list);
}

let loadData = (arr) => {
    items = arr;
    reload();
}

let reload = () => {
    document.getElementById("list-items").innerHTML = genListFromArray(items);
    focus();
}
let clearItems = () => {
    items = [];
    document.getElementById("list-items").innerHTML = "<h5>Vazio... Adicione alguns itens</h5>";
    document.getElementById("list-text-input").value = "";
    document.getElementById("list-text-input").focus();
}

let clearAndFocus = () => {
    document.getElementById("list-text-input").value = ""
    reload();
    document.getElementById("list-text-input").focus();
}

window.onload = function() {
    document.getElementById("button-add-item").onclick = () => {
        let valueOfInput = document.getElementById("list-text-input").value;
        if (valueOfInput.trim() == "") {
            focus();
        } else {
            items.push(valueOfInput);
            let htmlFromArr = genListFromArray(items);
            reload();
            clearAndFocus();
        }   
    }
    // adicionando evento enter
    document.getElementById("list-text-input").addEventListener("keypress", function() {
        if (event.key === "Enter") {
            event.preventDefault()
            document.getElementById("button-add-item").click();
        }
    });
    document.getElementById("button-clear-list").onclick = clearItems;
    document.getElementById("button-fetch-data").onclick = () => {
        fetchData("./example.json");
    };
}