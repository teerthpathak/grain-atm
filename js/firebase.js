const firebaseConfig = {
    apiKey: "AIzaSyAXiLg3jVd3lWGzRkEsp3V4K0rAdrqgY70",
    authDomain: "sci-fest-de74f.firebaseapp.com",
    databaseURL: "https://sci-fest-de74f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sci-fest-de74f",
    storageBucket: "sci-fest-de74f.firebasestorage.app",
    messagingSenderId: "345415963362",
    appId: "1:345415963362:web:fbca4170975a74eb9c84bb"
};
firebase.initializeApp(firebaseConfig);

function getFirebaseData(path) {
    return firebase.database().ref(path).once("value").then(snapshot => snapshot.val());
}

function setFirebaseData(dataLocation, childern, data) {
    firebase.database().ref(dataLocation).child(childern).set(data);
}

function removeFirebaseData(dataLocation, childern) {
    firebase.database().ref(dataLocation).child(childern).remove();
}