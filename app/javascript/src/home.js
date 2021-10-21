import { safeCredentials, handleErrors } from './utils/fetchHelper';

document.addEventListener("turbolinks:load", function () {
    if (document.querySelectorAll(".static_pages.home").length > 0) {


        let params = new URLSearchParams(window.location.search);

        if (params == "info=logged_out")
        {
            var displayMessage = document.getElementById("display-message");
            var createNew = document.createElement("div");
            createNew.setAttribute("class", "alert alert-primary mt-3 alert-dismissible");
            createNew.setAttribute("role", "alert");
            displayMessage.appendChild(createNew).innerText = "You successfully logged out";

            var newButton = document.createElement("button");
            newButton.setAttribute("type", "button");
            newButton.setAttribute("class", "close mb-4");
            newButton.setAttribute("data-dismiss", "alert");
            newButton.setAttribute("aria-label", "Close");
            createNew.appendChild(newButton);
            var span = document.createElement("span");
            span.setAttribute("aria-hidden", "true");
            newButton.appendChild(span).innerText = "x";

        }

        else if (params =="info=invalid_loggedIn")
        {
            var displayMessage = document.getElementById("display-message");
            var createNew = document.createElement("div")
            createNew.setAttribute("class", "alert alert-danger mt-3 alert-dismissible");
            createNew.setAttribute("role", "alert");
            displayMessage.appendChild(createNew).innerText = "You need to login to do that";

            var newButton = document.createElement("button");
            newButton.setAttribute("type", "button");
            newButton.setAttribute("class", "close mb-4");
            newButton.setAttribute("data-dismiss", "alert");
            newButton.setAttribute("aria-label", "Close");
            createNew.appendChild(newButton);
            var span = document.createElement("span");
            span.setAttribute("aria-hidden", "true");
            newButton.appendChild(span).innerText = "x";
        }
    }
})
