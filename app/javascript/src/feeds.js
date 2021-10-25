import {
  safeCredentials,
  handleErrors
} from 'src/utils/fetchHelper';

document.addEventListener("turbolinks:load", function() {
  if (document.querySelectorAll(".static_pages.feeds").length > 0) {

    fetch("/api/authenticated")
      .then(handleErrors)
      .then(res => {
        if (res.authenticated) {
          let userContainer = document.getElementById('current-user');
          let username = res.username;
          let icon = document.createElement("i");
          icon.classList.add("far", "fa-check-circle", "mt-3", "ml-1");
          userContainer.innerHTML = `${username}`;
          userContainer.appendChild(icon);
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
        getAll();
      })
  }

  const getAll = () => {
    fetch('/api/tweets')
      .then(handleErrors)
      .then(res => {
        let tweetFeed = document.getElementById("tweets");
        tweetFeed.innerHTML = ""
        res.tweets.forEach(item => {
          let currentUser = item.belongs_to_current_user;
          let username = item.username;
          let userId = item.id;
          let message = item.message;

          if (currentUser) {
            $("#tweets").append(`
                <div class="card">
                    <div class="card-body">
                      <img src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*" alt="" class = "img_avatar_tweet">
                      <div class="card-content">
                        <div class="username font-weight-bold"><p>${username} <i class="far fa-check-circle"></i></p></div>
                        <div class="user"><p><a href="#">@${username}</a></p></div>
                      </div>
                      <div class="card" id = "test-card">
                        <div class="card-content">
                          <span class = "card-text">${message}</span>
                        </div>

                      </div>
                      <button type="click" name="button" class = "btn btn-danger btn-sm" id = "delete" data-id = ${userId}><i class="fas fa-trash"></i></button>
                    </div>
                  </div>
              `)
          } else {
            $("#tweets").append(`
                <div class="card">
                    <div class="card-body">
                      <img src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*" alt="" class = "img_avatar_tweet">
                      <div class="card-content">
                        <div class="username font-weight-bold"><p>${username} <i class="far fa-check-circle"></i></p></div>
                        <div class="user"><p><a href="#">@${username}</a></p></div>
                      </div>
                      <div class="card" id = "test-card">
                        <div class="card-content">
                          <span class = "card-text">${message}</span>
                        </div>
                      </div>
                  </div>
                </div>
            `)
          }
        })
      })
  }

  getAll();


  //   const deleteTweets = (id) => {
  //     fetch("/api/tweets" + id, {
  //       method: "DELETE"
  //     })
  //     .then(handleErrors)
  //     .then(res => {
  //       if (res.success) {
  //         displayTweets();
  //       } else {
  //         console.log(res);
  //       }
  //     })
  //   }
  //
  // setTimeout(() => {
  //   const deleteButton = document.getElementById("delete");
  //   deleteButton.addEventListener("submit", () => {
  //     let dataId = deleteButton.getAttribute("data-id");
  //     deleteTweets(dataId);
  //   })
  //
  // }, 1000)
  //

  const tweetForm = document.getElementById("tweetForm");

  tweetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let message = document.getElementById("tweetBoxInput").value;
    let image = document.getElementById("image-select").files[0];
    createTweets(message, image);
    document.getElementById("tweetBoxInput").value = "";
  })


  const addTweetModal = document.getElementById("tweetFormModal");
  const currentUser = document.getElementById("current-user")

  addTweetModal.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = document.getElementById("tweetBoxInputModal").value;
    $("#modalHideClick").modal('hide');
    createTweets(message);
  })
}, 1000)
