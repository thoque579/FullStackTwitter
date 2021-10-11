import { safeCredentials, handleErrors } from "./utils/fetchHelper.js";

document.addEventListener("turbolinks:load", function () {
  if (document.querySelectorAll('.static_pages.signup').length > 0) {

    const signUpForm = document.getElementById('signUp');

    var authenticate = () => {
      fetch('/api/authenticated')
      .then(handleErrors)
      .then(res => {
        if (res.authenticated === true) {
          location.href = "/feeds"
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
            authenticate();
          } else {
            alert('fail');
            alert(JSON.stringify(res));
          }
      })
      .catch(error => {
        alert(error);
      })
    }

    var signUp = (username, email, password) => {
      fetch('/api/users', safeCredentials({
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      }))
      .then(handleErrors)
      .then(res => {
          if (res.success) {
            signIn(username, password)
            console.log("user is successfully created");
          } else {
            alert("account already exists!");
          }
      })
      .catch(error => {
        console.log(error)
      })
    }



    signUpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username_input = document.getElementById('username_input').value;

      const password_input = document.getElementById('password_input').value;

      const email_input = document.getElementById('email_input').value;

      signUp(username_input, email_input, password_input);
    });
  }
});
