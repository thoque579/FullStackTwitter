import { safeCredentials, handleErrors } from './utils/fetchHelper'


document.addEventListener("turbolinks:load", function() {
    if (document.querySelectorAll(".static_pages.login").length > 0) {
      var authenticate = () => {
        fetch('/api/authenticated')
        .then(handleErrors)
        .then(res => {
          if (res.authenticated) {
            location.href = "/feeds";

            var displayFeedsMessage = document.getElementById("displayAlertMessage");
            var container = document.createElement("div");
            displayFeedsMessage.appendChild(container);


          }
        })
        .catch(error => {
          alert(error);
        })

      }

        var signIn = (username, password) => {
          fetch('/api/sessions', safeCredentials({
            method: "POST",
            body: JSON.stringify({
              user: {
                username: username,
                password: password
              }
            })
          }))
          .then(handleErrors)
          .then(res => {
              if (res.success) {
                setTimeout(() => {
                  authenticate();
                }, 1000)

                var displayMessage = document.getElementById("displayAlertMessage");
                var createContainer = document.createElement("div");
                createContainer.setAttribute("class", "alert alert-success");
                displayMessage.appendChild(createContainer).innerHTML = "You logged in successfully";

              } else {
                var displayMessage = document.getElementById("displayAlertMessage");
                var createContainer = document.createElement("div");
                createContainer.setAttribute("class", "alert alert-danger");
                displayMessage.appendChild(createContainer).innerHTML = "Invalid User or Password";



              }
          })
          .catch(error => {
            alert(error);
          })
        }






        let loginForm = document.getElementById("login");

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const userInput = document.getElementById("username_input").value;
            const passwordInput = document.getElementById("password_input").value;


            signIn(userInput, passwordInput);


        })



    }
});
