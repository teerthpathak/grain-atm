function confirmPayment() {
    document.getElementById("message").style.color = "blue";
    document.getElementById("message").innerText = "Please Wait.";
    setFirebaseData("/control", "paid", 1);

    let d = new Date();

    let DD = `${d.getDate()}`;
    let MM = `${d.getMonth() + 1}`;
    let YYYY = `${d.getFullYear()}`;

    let HH = `${d.getHours()}`;
    let MIN = `${d.getMinutes()}`;
    let SS = `${d.getSeconds()}`;

    setTimeout(() => {
        setFirebaseData("/control", "paid", 0);
        getFirebaseData("/control/temp").then(data => {
            let amount = data["a"];
            let weight = data["w"];

            if (DD[1] == undefined) {
                DD = "0" + DD[0];
            }

            if (MM[1] == undefined) {
                MM = "0" + MM[0];
            }

            if (HH[1] == undefined) {
                HH = "0" + HH[0];
            }

            if (MIN[1] == undefined) {
                MIN = "0" + MIN[0];
            }
            if (SS[1] == undefined) {
                SS = "0" + SS[0];
            }

            let date = DD + "-" + MM + "-" + YYYY;
            let time = HH + ":" + MIN + ":" + SS;

            let id = YYYY + MM + DD + "_" + HH + MIN + SS + "_" + amount + "_" + weight;

            setFirebaseData(`/transaction/${id}`, "date", date);
            setFirebaseData(`/transaction/${id}`, "time", time);
            setFirebaseData(`/transaction/${id}`, "amount", amount);
            setFirebaseData(`/transaction/${id}`, "weight", weight);

            setFirebaseData(`/control/temp`, "a", 0);
            setFirebaseData(`/control/temp`, "w", 0);

            getFirebaseData("/control/weight").then(firebaseWeight => {
                setFirebaseData("/control", "weight", firebaseWeight - (weight / 100));
            });

            document.getElementById("message").style.color = "green";
            document.getElementById("message").innerText = `Amount: ${amount / 100} Rs., and Weight: ${weight / 100} Kg.`;
        });
    }, 10000);
}

function toggleWifi() {
    getFirebaseData("/control/wifi").then(data => {
        if (data == 1) {
            setFirebaseData("/control", "wifi", 0);
            document.getElementById("message2").style.color = "red";
            document.getElementById("message2").innerText = `WiFi: Off`;
        }
        else {
            setFirebaseData("/control", "wifi", 1);
            document.getElementById("message2").style.color = "green";
            document.getElementById("message2").innerText = `WiFi: On`;
        }
    });
}