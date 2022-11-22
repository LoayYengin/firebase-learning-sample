
/*//====== USAGE: ==========\\
import { UI } from "some source"

const auth = getAuth();
const ui = new UI(auth, {
    signInOptions: [
        defaultGoogleSignInButton,
        customGoogleSignInButton,
    ]}
);

document.append(ui);*/

export class UI extends HTMLElement {
    constructor( auth, options) {
        super();

        /*html structure:

        <firebaseui-frame>
            <ul>
                <li>Sign In Button</li>
                <li>Sign In Button</li>
                <li>Sign In Button</li>
            </ul>
        </firebaseui-frame>

        */
        let frame = document.createElement("firebaseui-frame");
        var ul = document.createElement("ul");
        
        frame.innerHTML = ul;


        options.forEach(renderListButton);

        //creates each button
        function renderListButton(buttonElement) { 
            let btn = document.createElement("li");
            
            ul.appendChild(btn);

            btn.innerHTML = buttonElement.displayName;
            btn.addEventListener("click", function() {buttonElement.signIn(auth)});
        }
    }
}

//defaultGoogleSignInButton Class?
export const defaultGoogleSignInButton = new GoogleSigninButtonWithPopup();


//GoogleSignInButtonWithPopup Class
import { GoogleAuthProvider, signInWithPopup } from firebase/auth;

export class GoogleSigninButtonWithPopup {
    constructor(options) {
        // deal with:
            // options.scopes
            // options.customParameters
        this.displayName = "Google";
        this.provider = new GoogleAuthProvider();
        
    }
    
    // when signin button is pressed signInWithPop is called (from Google's end) to authorize the user signin
    signIn(auth) {
        signInWithPopup(auth, this.provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user; //user is a JSON object

            //====================
            // handle webpage update, indicate that login was successfull
            //====================
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;

            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);

            //====================
            // handle webpage update, indicate that login failed
            //====================
        });
    }
}








// DON'T PANIC

// ************************ Problems of the Future **********************
// Climate Change
// Heat death of the universe




/*class defaultGoogleSignInButton {
    import { GoogleAuthProvider } from firebase/auth

    constructor() {
        this.elementName = "google-button";
        this.popUp = true;
        this.provider = new GoogleAuthProvider();
        this.displayName = "Google";
    }    

    //for the eventListeners, the actual function that gets run when the button is pressed.
    function signIn(auth) {
        if (popUp) {
            //do popup
        }
        else {
            //do redirect
        }
    }
}
*/



/*var test=document.createElement('section');
test.setAttribute('id','test');

var ul=document.createElement('ul');


document.body.appendChild(test);
test.appendChild(ul);

for (var i=0; i<array.length; i++){

    var li=document.createElement('li');

    ul.appendChild(li);
    li.innerHTML=li.innerHTML + array[i];

}*/


class UI extends HTMLElement {
    constructor(const authentication, options) {
        super();

        this.signInOptions = options.signInOptions; //set the buttons

        tempBox.createElement("error");
        //add all error messages to this element

        //create, init event listeners and format the buttons here.
        for (const option : this.signInOptions) {

            //tempBox is a replacement for 'document.' so that it doesn't get added before the 'document.append(ui);'
            var button = tempBox.createElement(option.elementName); //assuming it returns reference to created element


            button.addEventListener(..., signInType(auth, option.popUp,            option.provider, option.displayName))
        }
    }
}



class UI extends HTMLElement {
    @property(const authentication, options) {
        super();

        this.signInOptions = options.signInOptions; //set the buttons

        tempBox.createElement("error");
        //add all error messages to this element

        //create, init event listeners and format the buttons here.
        for (const option : this.signInOptions) {

            //tempBox is a replacement for 'document.' so that it doesn't get added before the 'document.append(ui);'
            var button = tempBox.createElement(option.elementName); //assuming it returns reference to created element


            button.addEventListener(..., signInType(auth, option.popUp,            option.provider, option.displayName))
        }
    }

}
