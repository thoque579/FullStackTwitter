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

    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const userInput = document.getElementById("username_input").value;
      const passwordInput = document.getElementById("password_input").value;
      signIn(userInput, passwordInput);
    })

    fetch('/api/authenticated')
    .then(handleErrors)
    .then(res => {
      console.log(res.username);
      if (res.authenticated) {
        let username = res.username;
        var displayMessage = document.getElementById("displayAlertMessage");
        var createNew = document.createElement("div");
        createNew.setAttribute("class", "alert alert-info mt-3 alert-dismissible");
        createNew.setAttribute("role", "alert");
        let spanUserContainer = document.createElement('span');
        let spanAnchor = document.createElement('a');
        spanAnchor.setAttribute('href', '/feeds');
        spanAnchor.setAttribute('class', 'usernameInAlert');
        spanUserContainer.appendChild(spanAnchor);
        displayMessage.appendChild(createNew).innerText = `You're already logged in as ${username}. \n Do you want to log in as a different user?`;

        var newButton = document.createElement("button");
        newButton.setAttribute("type", "button");
        newButton.setAttribute("class", "close mb-4");
        newButton.setAttribute("data-dismiss", "alert");
        newButton.setAttribute("aria-label", "Close");
        createNew.appendChild(newButton);
        var span = document.createElement("span");
        span.setAttribute("aria-hidden", "true");
        newButton.appendChild(span).innerText = "x";
      } else {
        console.log('you can login');
      }
    })



  }
});
