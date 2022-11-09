import {
    GoogleSignInButtonWithPopup,
    GoogleSignInButtonWithRedirect,
    defaultGoogleSignInButton,
    UI,
    } from 'firebaseui/auth'; //need a working import link
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js';
    
const customGoogleSignInButton = new GoogleSignInButtonWithRedirect({
scopes: [
        'https://www.googleapis.com/auth/contacts.readonly'
        ],
        customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
        }
});

const auth = getAuth();
const ui = new UI(auth, {
    signInOptions: [
        defaultGoogleSignInButton,
        customGoogleSignInButton,
    ]}
);

document.append(ui);