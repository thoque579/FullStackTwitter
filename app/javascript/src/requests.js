import { safeCredentials, handleErrors } from 'src/utils/fetchHelper';

var signUp = (username, email, password) => {
  fetch("/api/users", safeCredentials({
    method: "POST",
    body: {
      username: username,
      email: email,
      password: password
    }
  }))
  .then(handleErrors)
  .then(res => {
    if (res.success === true) {
      signIn(username, password)
    }
  })
  .catch(error => {
    console.log(error);
  })
}

var signIn = (username, password) => {
  fetch("/api/sessions", safeCredentials ({
    method: "POST",
    body: {
      username: username,
      password: password
    }
  }))
  .then(handleErrors)
  .then(response => {
    authenticated();
  })

}

var authenticated = () => {
  fetch("/api/authenticated", safeCredentials({
    method: "GET",
  }))
  .then(handleErrors)
  .then(response => {
    console.log(response)
    if (response.authenticated === true ) {
      window.location.replace('/feed')
    } else {
      console.log("Something went wrong please try again later")
    }
  })

}

var logIn = (username, password) => {
  fetch("/api/sessions", safeCredentials({
    method: "POST",
    body: {
      username: username,
      password: password
    }
  }))
  .then(handleErrors)
  .then(response => {
    if (response.success === true) {
      authenticated();
    }
  })
}

var logOut = () => {
  fetch("/api/destroy/", safeCredentials ({
    method: "DELETE",
  }))
  .then(handleErrors)
  .then(response => {
    console.log(response)
    window.location.replace('/');

  });
}


var postTweets = (message, image) => {
  fetch("/api/tweets", safeCredentials ({
    method: "POST",
    body: JSON.stringify({
      tweet: {
        message: message,
        image: image,
      }
    })
  }))
  .then(handleErrors)
  .then(response => {
    console.log(reponse)
  })
}
