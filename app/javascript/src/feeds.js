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

    const injectTweets = (message, user) => {
      let tweetFeed = document.getElementById("tweets");

      let tweetContainer = document.createElement("div");

      tweetContainer.setAttribute("class", "card");

      let tweet_content = document.createElement("div")

      tweet_content.setAttribute("class", "card-content");

      let content = document.createElement('span');

      content.innerHTML = message + " " + user;


      let deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.setAttribute("id", "delete-button");
      deleteButton.innerHTML = "remove";

      tweetFeed.appendChild(tweetContainer);
      tweetContainer.appendChild(tweet_content);
      tweet_content.appendChild(content);
      content.appendChild(deleteButton);
    }

    const createTweets = (message, image) => {
      fetch("/api/tweets", safeCredentials({
        method: "POST",
        body: JSON.stringify({
          tweet: {
            message: message,
            image: image
          }
        })
      }))
      .then(handleErrors)
      .then(res => {
        let userMessage = res.tweet.message;
        let user = res.tweet.username;
        console.log(userMessage);
        console.log(user);
        injectTweets(userMessage, user);
      })
    }

    const injectAllTweets = (message, user) => {
      let tweetFeed = document.getElementById("tweets");

      let tweetContainer = document.createElement("div");

      tweetContainer.setAttribute("class", "card");

      let tweet_content = document.createElement("div")

      tweet_content.setAttribute("class", "card-content");

      let content = document.createElement('span');

      content.innerHTML = message + " " + user;

      tweetFeed.appendChild(tweetContainer);
      tweetContainer.appendChild(tweet_content);
      tweet_content.appendChild(content);

    }

    const getAll = () => {
      fetch('/api/tweets')
      .then(handleErrors)
      .then(res => {
        res.tweets.forEach(item => {
          console.log(item.message);
          console.log(item.username);
          injectAllTweets(item.message, item.username);
          console.log(item.belongs_to_current_user);

        })
      })
    }

    getAll();



    const addTweetForm = document.getElementById("addingTweet");

    addTweetForm.addEventListener("submit", function(e) {

      e.preventDefault();
      const message = document.getElementById("tweetBoxInput").value;

      createTweets(message)
    })




    setTimeout(function() {
        const addTweetModal = document.getElementById("tweetFormModal");
        const currentUser = document.getElementById("current-user")

        addTweetModal.addEventListener("submit", (e) => {
          e.preventDefault();
          const message = document.getElementById("tweetBoxInputModal").value;
          $("#modalHideClick").modal('hide');
        })
    }, 1000)


})
