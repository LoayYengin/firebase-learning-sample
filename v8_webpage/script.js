
//all contains all the broken code(in order) so it doesnt execute on load
function all() {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
        signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Other config options...
    });
    

    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://www.example.com/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
        bundleId: 'com.example.ios'
        },
        android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
    };


    //TODO: get user email for this function
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });



    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        var email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        firebase.auth().signInWithEmailLink(email, window.location.href)
        .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
        });
    }




    //to sign out
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}