// Firebase configuration
// Replace these values with your ACTUAL Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyBJhlG_Sr3nnYZSpF5_SqtntJEjqlwVbP4",
    authDomain: "ai-learning-app-e231b.firebaseapp.com",
    projectId: "ai-learning-app-e231b",
    storageBucket: "ai-learning-app-e231b.firebasestorage.app",
    messagingSenderId: "448786160166",
    appId: "1:448786160166:web:f4143dc25fa45e8292a4e7"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    var auth = firebase.auth();
} else {
    console.error('Firebase SDK not loaded');
    var auth = null;
}