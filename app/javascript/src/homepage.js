import { safeCredentials, handleErrors } from "./utils/fetchHelper";
import { login, signup, authenticate, authenticatRedirect } from 'src/requests'

document.addEventListener("turbolinks:load", function () {
    if (document.querySelectorAll('.static_pages.signup').length > 0 ) {

        const userInput = document.getElementsByClassName('username').value;
        const passInput = document.getElementsByClassName('password').value;
        const signUpButton = document.getElementById('sign-up');
        const emailInput = document.getElementsByClassName('email').value;

        signUpButton.addEventListener('submit', function () {

          
        })











    }
})
