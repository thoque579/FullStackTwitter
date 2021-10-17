  import { safeCredentials, handleErrors } from './utils/fetchHelper'

    document.addEventListener("turbolinks:load", function() {
        if (document.querySelectorAll(".authenticated_pages.authenticated_home").length > 0) {

          fetch("/api/authenticated")
          .then(handleErrors)
          .then(res => {
            if (res.authenticated) {
              var displayMessage = document.getElementById("display-message");
              var createNew = document.createElement("div");
              createNew.setAttribute("class", "alert alert-primary mt-3")
              createNew.setAttribute("role", "alert");
              displayMessage.appendChild(createNew).innerText = "Welcome to the homepage";

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
              location.href = "home?info=invalid_loggedIn"
            }
          })
        }
    })
