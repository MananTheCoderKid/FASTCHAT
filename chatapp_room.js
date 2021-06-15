//connecting firebase
var firebaseConfig = {
    apiKey: "AIzaSyDd3HHPs8j0yGEi7mrcOGArTttk_VMqeGc",
    authDomain: "maindb-89d9a.firebaseapp.com",
    databaseURL: "https://maindb-89d9a-default-rtdb.firebaseio.com",
    projectId: "maindb-89d9a",
    storageBucket: "maindb-89d9a.appspot.com",
    messagingSenderId: "445056652451",
    appId: "1:445056652451:web:1b94e9eda8b0dc23285b16"
};
firebase.initializeApp(firebaseConfig);

//displaying username
user_name = localStorage.getItem("User Name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

//adding room
function addRoom() {

    //getting name
    room_name = document.getElementById("room_name").value;

    //storing name
    firebase.database().ref("/").child(room_name).update({
        purpose: "Adding Room"
    });
    localStorage.setItem("room_name", room_name);

    //next page
    window.location = "chat_page.html";
}

//getting data
function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("room name - " + Room_names);

            //trending room names display
            row = "<div class = 'room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names +
                "</div> <hr>";
        });
    });
}
getData();


// trending room location
function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "chat_page.html";
}

// logging out
function logout() {
    //clearing local storage
    localStorage.removeItem("User Name");
    localStorage.removeItem("room_name");
    // relocation
    window.location = "chatapp_login.html";
    //verifying
    console.log("Logged Out");
}