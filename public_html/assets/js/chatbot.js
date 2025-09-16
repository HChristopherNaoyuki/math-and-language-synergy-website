// chatbot.js - Chatbot functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Initialize chatbot functionality
    initializeChatbot();
});

/**
 * Initialize Chatbot functionality
 */
function initializeChatbot()
{
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    // Only initialize if chatbot elements exist
    if (chatbotToggle && chatbotContainer)
    {
        // Add event listener to toggle chatbot
        chatbotToggle.addEventListener('click', function()
        {
            toggleChatbot(chatbotContainer);
        });
        
        // Add event listener to close chatbot
        if (chatbotClose)
        {
            chatbotClose.addEventListener('click', function()
            {
                closeChatbot(chatbotContainer);
            });
        }
        
        // Add event listeners for sending messages
        if (chatbotInput && chatbotSend)
        {
            // Send message on button click
            chatbotSend.addEventListener('click', function()
            {
                sendChatMessage(chatbotInput);
            });
            
            // Send message on Enter key
            chatbotInput.addEventListener('keypress', function(e)
            {
                if (e.key === 'Enter')
                {
                    sendChatMessage(chatbotInput);
                }
            });
        }
        
        // Add welcome message
        addChatMessage('bot', 'Hello! I\'m your learning assistant. How can I help you today?');
    }
}

/**
 * Toggle chatbot visibility
 * @param {HTMLElement} chatbotContainer - The chatbot container element
 */
function toggleChatbot(chatbotContainer)
{
    if (chatbotContainer.style.display === 'flex')
    {
        closeChatbot(chatbotContainer);
    }
    else
    {
        openChatbot(chatbotContainer);
    }
}

/**
 * Open chatbot
 * @param {HTMLElement} chatbotContainer - The chatbot container element
 */
function openChatbot(chatbotContainer)
{
    chatbotContainer.style.display = 'flex';
    // Focus on input when opening
    const chatbotInput = document.querySelector('.chatbot-input input');
    if (chatbotInput)
    {
        setTimeout(function()
        {
            chatbotInput.focus();
        }, 100);
    }
}

/**
 * Close chatbot
 * @param {HTMLElement} chatbotContainer - The chatbot container element
 */
function closeChatbot(chatbotContainer)
{
    chatbotContainer.style.display = 'none';
}

/**
 * Send chat message
 * @param {HTMLElement} chatbotInput - The chatbot input element
 */
function sendChatMessage(chatbotInput)
{
    const message = chatbotInput.value.trim();
    
    if (message)
    {
        // Add user message to chat
        addChatMessage('user', message);
        
        // Clear input
        chatbotInput.value = '';
        
        // Simulate bot thinking
        setTimeout(function()
        {
            // Generate and add bot response
            const response = generateBotResponse(message);
            addChatMessage('bot', response);
        }, 1000);
    }
}

/**
 * Add message to chat
 * @param {string} sender - 'user' or 'bot'
 * @param {string} message - The message text
 */
function addChatMessage(sender, message)
{
    const messagesContainer = document.querySelector('.chatbot-messages');
    
    if (messagesContainer)
    {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.classList.add(sender);
        messageElement.textContent = message;
        
        messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

/**
 * Generate bot response based on user message
 * @param {string} message - The user's message
 * @returns {string} - The bot's response
 */
function generateBotResponse(message)
{
    const lowerMessage = message.toLowerCase();
    
    // Define responses based on keywords
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey'))
    {
        return 'Hello! How can I help you with your learning journey today?';
    }
    else if (lowerMessage.includes('course') || lowerMessage.includes('program'))
    {
        return 'We offer English, Japanese, and Mathematics courses. Would you like information about a specific program?';
    }
    else if (lowerMessage.includes('english'))
    {
        return 'Our English courses focus on fluency, communication skills, writing, and cultural awareness. They range from beginner to advanced levels.';
    }
    else if (lowerMessage.includes('japanese'))
    {
        return 'Our Japanese courses provide comprehensive language immersion with cultural insights. We offer courses for all proficiency levels.';
    }
    else if (lowerMessage.includes('math') || lowerMessage.includes('calculus') || lowerMessage.includes('algebra'))
    {
        return 'Our Mathematics programs develop critical thinking and problem-solving skills, from basic algebra to advanced calculus.';
    }
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee'))
    {
        return 'Course fees vary by program. English courses start at ZAR 9,000, Japanese at ZAR 9,900, and Mathematics at ZAR 7,200 per semester.';
    }
    else if (lowerMessage.includes('enroll') || lowerMessage.includes('apply') || lowerMessage.includes('register'))
    {
        return 'You can enroll through our enrollment page. Would you like me to direct you there?';
    }
    else if (lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('when'))
    {
        return 'Classes are scheduled throughout the week. You can view the complete schedule on our website or contact us for specific timing.';
    }
    else if (lowerMessage.includes('teacher') || lowerMessage.includes('tutor') || lowerMessage.includes('instructor'))
    {
        return 'Our instructors are highly qualified professionals with years of teaching experience. You can view their profiles on the About page.';
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone'))
    {
        return 'You can reach us at info@mathlanguagesynergy.edu or +27 (0)11 234 5678. Our office hours are Monday to Friday, 9 AM to 6 PM.';
    }
    else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks'))
    {
        return 'You\'re welcome! Is there anything else I can help you with?';
    }
    else
    {
        return 'I\'m here to help with information about our courses and programs. What would you like to know?';
    }
}