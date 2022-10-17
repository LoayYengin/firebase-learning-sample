import { getAuth, signInWithPopup, 
        GithubAuthProvider,
        GoogleAuthProvider,
        TwitterAuthProvider,
        //OTHERAuthProvider,
        signInAnonymously, } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js"

const auth = getAuth();

const providerGithub = new GithubAuthProvider();
const providerGoogle = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
//const providerOTHER = new OTHERAuthProvider();

var githubButton = document.getElementById("github-login-button");
var googleButton = document.getElementById("google-login-button");
var twitterButton = document.getElementById("twitter-login-button");
var anonymousButton = document.getElementById("anonymous-login-button");
//var OTHERButton = ...

githubButton.addEventListener("click", function() {signInPopup(auth, providerGithub, "Github")});
googleButton.addEventListener("click", function() {signInPopup(auth, providerGoogle, "Google")});
twitterButton.addEventListener("click", function() {signInPopup(auth, providerTwitter, "Twitter")});
anonymousButton.addEventListener("click", function() {signInAnonymous(auth)});
//OTHERButton.addEventListener("click", function() {signInPopup(auth, providerOTHER)});

function GetCredential(providerName, result) {
    var cred
    switch (providerName) {
        case "Github":
            cred = GithubAuthProvider.credentialFromResult(result);
            break;
        case "Google":
            cred = GoogleAuthProvider.credentialFromResult(result);
            break;
        case "Twitter":
            cred = TwitterAuthProvider.credentialFromResult(result);
            break;
    }
    return cred;
}

function signInPopup(authorization, provider, providerName) {
    signInWithPopup(authorization, provider)
    .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GetCredential(providerName, result); 
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user; //user is a JSON object

        LoggedInWith(providerName); //update "logged in with __" text
        UserInfo(`Welcome ${user.displayName}, your ${providerName.toLowerCase()} email is ${user.email}.`);
        
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;

        // The AuthCredential type that was used.
            //================================================
            //  TODO: Create a "GetErrorCredential(providerName, error)" function
            //  for different providers (see "GetCredential(providerName, result)")
            //================================================
        const credential = GithubAuthProvider.credentialFromError(error);

        // ...
        DisplayError(providerName + " sign in error: "+errorMessage);
    });
}

function signInAnonymous(authentication) {
    signInAnonymously(authentication)
    .then(() => {
        // Signed in..
        LoggedInWith("Anonymous")
        UserInfo(`I have no idea who you are ;)`)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        DisplayError("Anonymous sign in error: "+errorMessage);
    });
}

//Printing functions, can be moved to a different js file
function LoggedInWith(method) {
    document.getElementById("LoginType").innerHTML = `Logged in with ${method}`;
}
function UserInfo(info) {
    document.getElementById("UserInfo").innerHTML = info;
}
function DisplayError(error) {
    let s = new Date().toLocaleString();
    document.getElementById("ErrorMessage").innerHTML = error + " Time: "+s;
}

// signInModule.js
// export {user}