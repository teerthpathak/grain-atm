function getStatus(id) {
    firebase.database().ref("/control/wifi").on("value", (snapshot) => {
        let data = snapshot.val();
        if (data == 0) {
            document.getElementById(id).innerText = "Machine Status: Offline";
            document.getElementById(id).style.background = "rgb(253, 150, 130)";
            document.getElementById(id).style.color = "rgb(255, 0, 0)";
        }
        else if (data == 1) {
            document.getElementById(id).innerText = "Machine Status: Online";
            document.getElementById(id).style.background = "#bbf7d0";
            document.getElementById(id).style.color = "#22c55e";
        }
    });
}

function getPrice(id) {
    firebase.database().ref("/control/price").on("value", (snapshot) => {
        document.getElementById(id).innerText = snapshot.val() + " ₹/Kg";
    });
}

function getWeight(id) {
    firebase.database().ref("/control/weight").on("value", (snapshot) => {
        let current_weight_of_grains_present = snapshot.val();
        document.getElementById(id).innerText = current_weight_of_grains_present + " Kg";
        if (current_weight_of_grains_present >= 5) {
            document.getElementById(id).style.color = "rgb(13, 110, 253)";
        }
        else {
            document.getElementById(id).style.color = "rgb(255, 0, 0)";
        }
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
                                                              </tr>`;
                    counter++;
                }
            }
        }, 100);
    });
}

function update() {
    let val = parseInt(document.getElementById('updatePriceInput').value);
    if (val <= 325) {
        setFirebaseData('/control', 'price', val);
        document.getElementById('updatePriceInput').value = '';
    }
}

/*
function add() {
    let val = parseFloat(document.getElementById('updateAddInput').value);
    if (val <= 5) {
        getFirebaseData("/control/weight").then(data => {
            setFirebaseData('/control', 'weight', data + val)
            document.getElementById('updateAddInput').value = '';
        });
    }
}
*/