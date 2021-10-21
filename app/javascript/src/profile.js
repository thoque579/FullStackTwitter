import { safeCredentials, handleErrors } from './utils/fetchHelper'

document.addEventListener("turbolinks:load", function () {
    if (document.querySelectorAll(".static_pages.profile").length > 0) {

      fetch("/api/authenticated")
      .then(handleErrors)
      .then(res => {
        if (res.authenticated) {
        
        } else {
          console.log("false");
        }
      })


    }
});
