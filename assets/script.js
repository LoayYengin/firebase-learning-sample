function ButtonClick() {
    document.getElementById("coolButton").innerHTML = "You got a nice mouse cursor";
}

function loginGithub() {
    var provider = new firebase.auth.GithubAuthProvider();
    
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
    
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = credential.accessToken;
    
        // The signed-in user info.
        var user = result.user;
        
        document.getElementById("coolButton").innerHTML = user;
        console.log(user);
    
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}
