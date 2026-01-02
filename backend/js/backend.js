function getPrice(id) {
    firebase.database().ref("/control/price").on("value", (snapshot) => {
        document.getElementById(id).innerText = snapshot.val();
    });
}

function getWeight(id) {
    firebase.database().ref("/control/weight").on("value", (snapshot) => {
        document.getElementById(id).innerText = snapshot.val();;
    });
}

function getTransaction(id) {
    firebase.database().ref("/transaction").on("value", (snapshot) => {
        setTimeout(() => {
            document.getElementById(id).innerHTML = "";

            let obj = snapshot.val()
            let objKeys = Object.keys(obj);
            let objLen = objKeys.length;
            let counter = 1;
            for (let i = objLen; i >= 0; i--) {

                if (i != objLen) {
                    let data = obj[objKeys[i]];

                    document.getElementById(id).innerHTML += `<tr>
                                                                <td>${counter}</td>
                                                                <td>${data["date"]}</td>
                                                                <td>${data["time"]}</td>
                                                                <td>${data["amount"] / data["weight"]} ₹/Kg</td>
                                                                <td>${data["weight"] / 100} Kg</td>
                                                                <td>₹${data["amount"] / 100}</td>
                                                                <td><label class="deleteLabel" onclick="deleteTransactionHistory('${objKeys[i]}');">Delete</label></td>
                                                              </tr>`;
                    counter++;
                }
            }
        }, 100);
    });
}

function deleteTransactionHistory(location) {
    removeFirebaseData("/transaction", location);
}

function update() {
    let val = parseInt(document.getElementById('updatePriceInput').value);
    setFirebaseData('/control', 'price', val);
}

function add() {
    let val = parseFloat(document.getElementById('updateAddInput').value);
    setFirebaseData('/control', 'weight', val)
    document.getElementById('updateAddInput').value = '';
}