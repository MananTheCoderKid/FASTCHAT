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
room_name = localStorage.getItem("room_name")
console.log(user_name + " | " + room_name);

// logging out
function logout() {
    //clearing local storage
    localStorage.removeItem("User Name");
    localStorage.removeItem("room_name");
    // relocation
    window.location = "chatapp_login.html";
    // verifying
    console.log("Logged Out");
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id + " | " + message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4>" + +"<img class='tick' src='tick.png'> </h4>";
                message_with_tag = "<h4 class='message_h4'> " + message + "</h4>";
                like_button = "<button class = 'btn btn-warning btn btn-lg user_tick' id=" + firebase_message_id + " value = " + like + " onclick = 'update_like(this.id)' > ";
                span_with_tag = " < span class = 'glyphicon glyphicon-thumbs-up' > Like: " + like + " < /span> </button > ";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").value += row;
                //End code
            }
        });
    });
}
getData();

function send() {
    message = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

updateLike(message_id); {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({ like: updated_likes });
}