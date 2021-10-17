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
        }

        else if (params =="info=invalid_loggedIn")
        {
            var displayMessage = document.getElementById("display-message");
            var createNew = document.createElement("div")
            createNew.setAttribute("class", "alert alert-danger mt-3 alert-dismissible");
            createNew.setAttribute("role", "alert");
            displayMessage.appendChild(createNew).innerText = "you need to login to do that";
        }
    }
})
