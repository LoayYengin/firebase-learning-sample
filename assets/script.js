import { getAuth, signInWithPopup, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js"

const auth = getAuth();

const providerGithub = new GithubAuthProvider();
//const providerOTHER = new OTHERAuthProvider();

var githubButton = document.getElementById("github-login-button");
//var OTHERButton = ...

githubButton.addEventListener("click", function() {signInPopup(auth, providerGithub)});
//OTHERButton.addEventListener("click", function() {signInPopup(auth, providerOTHER)});


function signInPopup(authorization, provider) {
    signInWithPopup(authorization, provider)
    .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user; //user is a JSON object
        
        document.getElementById("userButton").innerHTML = `Welcome ${user.displayName}, your github email is ${user.email}.`;
        
        
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
    });
}

// signInModule.js
// export {user}