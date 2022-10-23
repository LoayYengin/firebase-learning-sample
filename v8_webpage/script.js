const firebaseConfig = {
    apiKey: "AIzaSyA51MI8bkk9w3XLyrLgk486FOT6KCTsCPs",
    authDomain: "fir-ui-prototype.firebaseapp.com",
    projectId: "fir-ui-prototype",
    storageBucket: "fir-ui-prototype.appspot.com",
    messagingSenderId: "162693908392",
    appId: "1:162693908392:web:d668d741cd177e2172bf9d"
  };

firebase.initializeApp(firebaseConfig)

function initApp() {  
//console.log("im in initApp()");
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in-status').textContent = user.displayName + ' is in the matrix.';
        document.getElementById('sign-in').textContent = 'Sign out';
        
        document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
        }, null, '  ');
        });
    } else {
        // User is signed out.
        console.log("User is null, returning to login page.");
        location.href = "./main.html";
    }
    }, function(error) {
    console.log(error);
    });
  };

initApp();

window.onload = init
function init() {
    console.log(document.getElementById('sign-in'))
    document.getElementById('sign-in').addEventListener("click", function() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            location.href = "./main.html";
            console.log("User has signed out, returning to login page.")
        }).catch((error) => {
            // An error happened.
            console.log("error:" +error);
        });
    });
}