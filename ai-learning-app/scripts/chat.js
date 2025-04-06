document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const generationSection = document.getElementById('generation-section');
    const topicDisplay = document.getElementById('topic-display');

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        firebase.auth().signOut()
            .then(() => {
                window.location.href = 'index.html';
            });
    });

    // Add message to chat
    function addMessage(message, isAI = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isAI ? 'ai-message' : 'user-message'} mb-4`;
        
        messageDiv.innerHTML = `
            <div class="flex items-start ${!isAI ? 'justify-end' : ''}">
                ${isAI ? 
                    '<div class="bg-blue-100 p-3 rounded-full mr-3">' +
                    '<i class="fas fa-robot text-blue-600"></i></div>' : ''}
                <div class="${isAI ? 'bg-blue-50' : 'bg-green-50'} p-3 rounded-lg max-w-xs">
                    <p>${message}</p>
                </div>
                ${!isAI ? 
                    '<div class="bg-green-100 p-3 rounded-full ml-3">' +
                    '<i class="fas fa-user text-green-600"></i></div>' : ''}
            </div>
        `;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Handle send message
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, false);
            messageInput.value = '';
            
            // Show loading state
            topicDisplay.textContent = message;
            generationSection.classList.remove('hidden');
            
            // Simulate AI response (will be replaced with actual API call)
            setTimeout(() => {
                addMessage(`I'll generate a 3D lecture about ${message}. First, let me explain the key concepts...`, true);
                
                // Simulate theory generation
                setTimeout(() => {
                    addMessage(`Here's the theoretical foundation for ${message}:\n\n[Generated theory content would appear here]`, true);
                    
                    // Simulate video generation
                    setTimeout(() => {
                        generationSection.classList.add('hidden');
                        addMessage(`Your 3D lecture is ready! Would you like to watch it now or in VR?`, true);
                        
                        // Add action buttons
                        const actionDiv = document.createElement('div');
                        actionDiv.className = 'flex space-x-4 mt-4';
                        actionDiv.innerHTML = `
                            <button class="watch-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Watch Now
                            </button>
                            <button class="vr-btn bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                                Watch in VR
                            </button>
                        `;
                        chatContainer.appendChild(actionDiv);
                        
                        // Add button event listeners
                        document.querySelector('.watch-btn').addEventListener('click', () => {
                            window.location.href = 'video-player.html?topic=' + encodeURIComponent(message);
                        });
                        
                        document.querySelector('.vr-btn').addEventListener('click', () => {
                            window.location.href = 'vr-viewer.html?topic=' + encodeURIComponent(message);
                        });
                    }, 3000);
                }, 2000);
            }, 1000);
        }
    });

    // Allow sending message with Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});