// Authentication Controller
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI references
    const authContainer = document.getElementById('auth-container');
    
    // Show Login Form by default
    showLoginForm();

    // Auth state observer
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('User logged in:', user.email);
            window.location.href = 'chat.html';
        }
    });

    function showLoginForm() {
        authContainer.innerHTML = `
            <div class="login-form">
                <h2 class="text-xl font-semibold mb-4">Login</h2>
                <input type="email" id="email" placeholder="Email" class="w-full p-2 mb-4 border rounded">
                <input type="password" id="password" placeholder="Password" class="w-full p-2 mb-4 border rounded">
                <button id="login-btn" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
                <button id="google-login" class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4">
                    Sign in with Google
                </button>
                <p class="mt-4 text-center">
                    Don't have an account? <a href="#" id="signup-link" class="text-blue-500">Sign up</a>
                </p>
            </div>
        `;

        // Add event listeners
        document.getElementById('login-btn').addEventListener('click', loginWithEmail);
        document.getElementById('google-login').addEventListener('click', loginWithGoogle);
        document.getElementById('signup-link').addEventListener('click', showSignupForm);
    }

    function showSignupForm(e) {
        e.preventDefault();
        authContainer.innerHTML = `
            <div class="signup-form">
                <h2 class="text-xl font-semibold mb-4">Create Account</h2>
                <input type="email" id="signup-email" placeholder="Email" class="w-full p-2 mb-4 border rounded">
                <input type="password" id="signup-password" placeholder="Password (6+ characters)" class="w-full p-2 mb-4 border rounded">
                <button id="signup-btn" class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Sign Up
                </button>
                <p class="mt-4 text-center">
                    Already have an account? <a href="#" id="login-link" class="text-blue-500">Log In</a>
                </p>
            </div>
        `;

        document.getElementById('signup-btn').addEventListener('click', signupWithEmail);
        document.getElementById('login-link').addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
    }

    function loginWithEmail() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => alert(error.message));
    }

    function loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .catch(error => alert(error.message));
    }

    function signupWithEmail() {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => alert(error.message));
    }
});