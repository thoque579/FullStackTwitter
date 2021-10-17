import { safeCredentials, handleErrors } from 'src/utils/fetchHelper';

document.addEventListener("turbolinks:load", function() {
  if (document.querySelectorAll(".static_pages.feeds").length > 0) {

    fetch("/api/authenticated")
      .then(handleErrors)
      .then(res => {
        if (res.authenticated) {
          console.log("authenticated");
        } else {
          location.href = "/home?info=invalid_loggedIn"

        }
      })

    let logout = () => {
      fetch("/api/destroy", {
          method: "DELETE",
        })
        .then(handleErrors)
        .then(res => {
          if (res.success) {
            location.href = "/home?info=logged_out"
          } else {
            alert("fail")
          }
        })
        .catch(error => {
          alert(error);
        })
    }


    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", function() {
      logout();
    })
  }
})
