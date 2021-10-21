import { safeCredentials, handleErrors } from 'src/utils/fetchHelper';

document.addEventListener("turbolinks:load", function() {
  if (document.querySelectorAll(".static_pages.feeds").length > 0) {

    fetch("/api/authenticated")
      .then(handleErrors)
      .then(res => {
        if (res.authenticated) {
          let userContainer = document.getElementById('current-user');
          let username = res.username;
          userContainer.innerHTML= username;
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


    /* character counter */

    const textBoxModal = document.getElementById("tweetBoxInputModal");
    const max_char = 140;
    const characters_remaining = document.getElementById("char-counter");


    textBoxModal.addEventListener("input", (e) => {
      const remaining = max_char - textBoxModal.value.length;

      characters_remaining.textContent = `${remaining} characters remaining`;

      if (remaining < max_char * 0.1) {
        characters_remaining.style.color = "red"
      } else {
        return null;
      }


    })


    /* Tweet Function */

    const addTweets = (message, image) => {
      fetch("/api/tweets", safeCredentials({
        method: "POST",
        body: JSON.stringify({
          tweet: {
            message: message,
            image: image? image : null
          }
        })
      }))
      .then(handleErrors)
      .then(res => {
        let userMessage = res.tweet.message;
        let tweetBox = document.getElementById('tweets');
        tweetBox.innerHTML = userMessage;
      })
    }


    const addTweetForm = document.getElementById("addingTweet");

    addTweetForm.addEventListener("submit", function(e) {

      e.preventDefault();
      const message = document.getElementById("tweetBoxInput").value;

      addTweets(message)
    })




    setTimeout(function() {
        const addTweetModal = document.getElementById("tweetFormModal");

        addTweetModal.addEventListener("submit", (e) => {
          e.preventDefault();
          const message = document.getElementById("tweetBoxInputModal").value;
          addTweets(message);
          $("#modalHideClick").modal('hide');
        })
    }, 1000)


})
