// FirebaseDriver.js
// Custom created script file for initializing Firebase

var config = {
    apiKey: "AIzaSyCD4c_cQUup4O_DNDPMCAfuKJU9HXdVPs4",
    authDomain: "myfirstfirebase-db265.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-db265.firebaseio.com",
    projectId: "myfirstfirebase-db265",
    storageBucket: "myfirstfirebase-db265.appspot.com",
    messagingSenderId: "250224895311"
};
firebase.initializeApp(config);

if (firebase.auth().currentUser == null) {
    login();
}

// Authentication
function login() {
    popupAuth();
    //redirectAuth();
}

function popupAuth() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
        'login_hint': 'v.prasannaashok@gmail.com'
    });

    var user = null;

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a google access token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        user = result.user;

        var userDisplay = document.getElementById('user');
        userDisplay.innerHTML = "Logged in user: " + user.displayName;

    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credenial = error.credential;
    });
}

/*
// function redirectAuth() {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//     provider.setCustomParameters({
//         'login_hint': 'v.prasannaashok@gmail.com'
//     });

//     firebase.auth().signInWithRedirect(provider);

//     firebase.auth().getRedirectResult().then(function (result) {
//         if (result.credential) {
//             var token = result.credenial.accessToken;
//         }
//         var user = result.user;
//     }).catch(function (error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         var email = error.email;
//         var credenial = error.credenial;
//     });
// }
*/