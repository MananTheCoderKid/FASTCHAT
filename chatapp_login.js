function addUser() {
    username = document.getElementById("user_name").value;
    localStorage.setItem("User Name", username);
    console.log(username);
    console.log("Logged In");
    window.location = "chatapp_room.html";
}