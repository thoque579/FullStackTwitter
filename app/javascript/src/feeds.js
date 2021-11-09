import { safeCredentials, handleErrors, safeCredentialsFormData } from 'src/utils/fetchHelper';

document.addEventListener("turbolinks:load", () => {
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
    let formData = new FormData();
    formData.append("tweet[message]", message);

    if (image) {
      formData.append("tweet[image]", image);
    }

        fetch("/api/tweets", safeCredentialsFormData({
          method: "POST",
          body: formData
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
          console.log(res.tweets);

          res.tweets.forEach(item => {
            let currentUser = item.belongs_to_current_user;
            let username = item.username;
            let userId = item.id;
            let message = item.message;

            let image = item.image;

            if (currentUser) {
              $("#tweets").append(`
                  <div class="card">
                      <div class="card-body">
                        <img src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*" alt="" class = "img_avatar_tweet">
                        <div class="card-content">
                          <div class="username font-weight-bold"><p>${username} <i class="far fa-check-circle"></i></p></div>
                          <div class="user"><p><a href="/profile">@${username}</a></p></div>
                        </div>
                        <div class="card" id = "test-card">
                          <div class="card-content">
                            <span class = "card-text">${message}</span>
                            <br>
                          ` + (image != null? `<span class = "card-text"><img class = "user-image" src = "${image}" height = "500" width = "600" ></span></div></div>` : '') +  `
                          <span class = "card-text"><button type="click" name="button" class = "btn btn-danger btn-sm" id = "delete" data-id = "${userId}"><i class="fas fa-trash"></i></button></span>
                      </div>
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
                          <div class="user"><p><a href="/profile?@user=${username}">@${username}</a></p></div>
                        </div>
                        <div class="card" id = "test-card">
                          <div class="card-content">
                            <span class = "card-text">${message}</span>
                            <br>
                            ` + (image != null? `<span class = "card-text"><img class = "user-image" src = "${image}" height = "500" width = "600" ></span></div></div>` : '') + `
                          </div>
                        </div>
                    </div>
                  </div>`
                 )
            }
          })
        })
    }

    getAll();

    const tweetForm = document.getElementById("tweetForm");

      tweetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let message = document.getElementById("tweetBoxInput").value;
        let image = document.getElementById("image-select").files[0];
        createTweets(message, image);
        document.getElementById("tweetBoxInput").value = "";

      })

      const addTweetModal = document.getElementById("tweetFormModal");
      const currentUser = document.getElementById("current-user");

      addTweetModal.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = document.getElementById("tweetBoxInputModal").value;
        const image = document.getElementById("image-select-modal").files[0];
        $("#modalHideClick").modal('hide');
        createTweets(message, image);
        document.getElementById("tweetBoxInputModal").value = "";
      })

      const deleteTweet = (id) => {
          fetch("/api/tweets/" + id, {
            method: "DELETE"
          })
          .then(handleErrors)
          .then(res => {
            if (res.success) {
              getAll();
            } else {
              console.log(res)
            }
          })
        }

      $(document).on('click', '#delete', function () {
        deleteTweet($(this).data('id'));
      });

  }
})
