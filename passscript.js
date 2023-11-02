const apiUrl = "https://asianunited.stu.nighthawkcodingsociety.com/api/scores"; // Update with the correct API URL

const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
];
function authenticateUser() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);
    setCookie("username", usernameInput, 30)
    //if (user) {
      //  fetch(apiUrl)
        //    .then(response => response.json())
          //  .then(data => {
            //    displayUserData(data);
    //        })
      //      .catch(error => {
        //        displayError("Error fetching data from the API.");
 //           });
   // } else {
     //   displayError("Invalid username or password.");
   // }
    //const username = document.getElementById("username").value; // Get the username from the input field
    //getUserData(username);
}

function getUserData(username) {
    const userApiUrl = `${apiUrl}/users/${username}`; // Construct the user-specific API URL
    fetch(userApiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.status === 404) {
            displayError("User data not found.");
            return;
        }
        return response.json();
    })
    .then(data => {
        // Handle the received user-specific data (data) here
        displayUserData(data);
    })
    .catch(error => {
        displayError("Error fetching user data from the API.");
    });
}

function displayUserData(userData) {
    // Display user-specific data on the HTML page
    const output = document.getElementById("output");
    output.innerHTML = JSON.stringify(userData, null, 2);
}
function displayError(errorMessage) {
    const output = document.getElementById("output");
    output.innerHTML = `<p style="color: red">${errorMessage}</p>`;
}
// ... (your other functions)
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
