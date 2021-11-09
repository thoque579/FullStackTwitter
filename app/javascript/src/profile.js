import { safeCredentials, handleErrors } from './utils/fetchHelper'

    document.addEventListener("turbolinks:load", () => {

      if (document.querySelectorAll(".static_pages.profile").length > 0) {

      fetch('/api/authenticated/')
      .then(handleErrors)
      .then(res => {
        if (res.authenticated) {
          console.log(res);
          let current_user = document.getElementById("current_user");
          current_user.innerHTML = res.username;
          let params = new URLSearchParams(window.location.search);
          if (params.has('@user')) {
            let test = params.get('@user');
            current_user.innerHTML = test;
            getAllCurrent(test);
          } else {
            getAllCurrent(res.username);
          }

        } else {
          location.href = "/home?info=invalid_loggedIn"
        }
      })



        const getAllCurrent = (username) => {
        fetch("/api/users/" + username + "/tweets")
        .then(handleErrors)
        .then(res => {
          console.log(res);
          if (res.tweets.length == 0) {
            var displayMessage = document.getElementById("tweet-alert");
            var createNew = document.createElement("div");
            createNew.setAttribute("class", "alert alert-info mt-3 alert-dismissible");
            createNew.setAttribute("role", "alert");
            displayMessage.appendChild(createNew).innerText = "You have no tweets";

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
          res.tweets.forEach(tweet => {
            console.log(tweet);
            let username = tweet.username;
            let message = tweet.message;
            let userId = tweet.id;
            let image = tweet.image;
            console.log(tweet.belongs_to_current_user);
            console.log(tweet.id);

            if (tweet.belongs_to_current_user) {
              $("#feeds").append(`
                  <div class="card">
                      <div class="card-body">
                        <img src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*" alt="" class = "img_avatar_tweet">
                        <div class="card-content">
                          <div class="username font-weight-bold"><p>${username} <i class="far fa-check-circle"></i></p></div>
                          <div class="user"><p><a href="#">@${username}</a></p></div>
                        </div>
                        <div class="card" id = "test-card">
                          <div class="card-content">
                          <span class = "card-text ml-auto">${message}</span>
                            <br> ` + (image != null? `<span class = "card-text"><img src = "${image}" height = "500" width = "600"></span>` : '') + `
                          </div>
                        </div>
                      </div>
                    </div>
                `)
            } else {
              $("#feeds").append(`
                  <div class="card">
                      <div class="card-body">
                        <img src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*" alt="" class = "img_avatar_tweet">
                        <div class="card-content">
                          <div class="username font-weight-bold"><p>${username} <i class="far fa-check-circle"></i></p></div>
                          <div class="user"><p><a href="#">@${username}</a></p></div>
                        </div>
                        <div class="card" id = "test-card">
                          <div class="card-content">
                          <span class = "card-text ml-auto">${message}</span>
                            <br> ` + (image != null? `<span class = "card-text"><img src = "${image}" height = "500" width = "600"></span>` : '') + `
                          </div>
                        </div>
                      </div>
                    </div>
                `)
            }

          })
        })
      }





  }
})
