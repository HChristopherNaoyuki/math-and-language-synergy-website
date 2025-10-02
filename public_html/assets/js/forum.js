// forum.js - Forum functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize forum functionality
    initializeForum();
    loadThreads();
});

/**
 * Initialize forum functionality
 */
function initializeForum() {
    initializeThreadNavigation();
    initializeNewThreadForm();
    initializeSearchFunctionality();
    setupUserMenu();
    initializeLikeButtons();
}

/**
 * Initialize like button functionality
 */
function initializeLikeButtons() {
    document.addEventListener('click', function(e) {
        const likeBtn = e.target.closest('.comment-react button');
        if (likeBtn) {
            e.preventDefault();
            handleLikeClick(likeBtn);
        }
    });
}

/**
 * Handle like button click
 */
function handleLikeClick(likeBtn) {
    const likeCountSpan = likeBtn.parentNode.querySelector('span');
    let likeCount = parseInt(likeCountSpan.textContent) || 0;
    
    if (likeBtn.classList.contains('liked')) {
        // Unlike
        likeCount--;
        likeBtn.classList.remove('liked');
    } else {
        // Like
        likeCount++;
        likeBtn.classList.add('liked');
    }
    
    likeCountSpan.textContent = likeCount;
    
    // Save like state to localStorage
    const threadId = likeBtn.closest('.thread-detail-card') ? 
        document.querySelector('.thread-detail-view').getAttribute('data-thread-id') : null;
    
    if (threadId) {
        saveLikeState(threadId, likeBtn.classList.contains('liked'));
    }
}

/**
 * Save like state to localStorage
 */
function saveLikeState(threadId, isLiked) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return;
    
    let userLikes = JSON.parse(localStorage.getItem(`userLikes_${currentUser.username}`) || '{}');
    userLikes[threadId] = isLiked;
    localStorage.setItem(`userLikes_${currentUser.username}`, JSON.stringify(userLikes));
}

/**
 * Get like state from localStorage
 */
function getLikeState(threadId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return false;
    
    const userLikes = JSON.parse(localStorage.getItem(`userLikes_${currentUser.username}`) || '{}');
    return userLikes[threadId] || false;
}

/**
 * Setup user menu functionality
 */
function setupUserMenu() {
    const userToggle = document.querySelector('.user-toggle');
    const userDropdown = document.querySelector('.user-dropdown');
    const switchAccount = document.getElementById('switch-account');
    const logout = document.getElementById('logout');

    if (userToggle && userDropdown) {
        userToggle.addEventListener('click', function(e) {
            e.preventDefault();
            userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userToggle.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }

    if (switchAccount) {
        switchAccount.addEventListener('click', function(e) {
            e.preventDefault();
            handleSwitchAccount();
        });
    }

    if (logout) {
        logout.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
}

/**
 * Handle switch account
 */
function handleSwitchAccount() {
    localStorage.removeItem('currentUser');
    showNotification('Switching accounts...', 'info');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

/**
 * Handle logout
 */
function handleLogout() {
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

/**
 * Load threads from storage
 */
function loadThreads() {
    let threads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
    
    // If no threads in localStorage, load default threads
    if (threads.length === 0) {
        threads = getDefaultThreads();
        localStorage.setItem('forumThreads', JSON.stringify(threads));
    }
    
    displayThreads(threads);
}

/**
 * Get default threads for initial setup
 */
function getDefaultThreads() {
    const now = new Date();
    return [
        {
            id: 101,
            title: "Help with English essay structure",
            content: "I'm struggling with organizing my ideas for the academic writing assignment. Any tips on how to structure my essay properly?",
            category: "english",
            author: "Student123",
            date: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            replies: 5,
            views: 24,
            likes: 3,
            tags: ["writing", "essay", "structure"]
        },
        {
            id: 102,
            title: "Best resources for expanding vocabulary?",
            content: "Looking for recommendations beyond the course materials to improve my English vocabulary. Any good apps, books, or websites?",
            category: "english",
            author: "LanguageLearner",
            date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            replies: 8,
            views: 37,
            likes: 7,
            tags: ["vocabulary", "resources", "learning"]
        },
        {
            id: 201,
            title: "Kanji memorization techniques",
            content: "Does anyone have effective methods for remembering kanji characters? I'm struggling with the N4 level kanji and looking for better study techniques.",
            category: "japanese",
            author: "KanjiStudent",
            date: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
            replies: 3,
            views: 19,
            likes: 5,
            tags: ["kanji", "study", "techniques"]
        },
        {
            id: 202,
            title: "Japanese listening practice",
            content: "Looking for partners to practice Japanese conversation. I'm available weekday evenings. Intermediate level preferred.",
            category: "japanese",
            author: "ConversationPartner",
            date: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
            replies: 6,
            views: 42,
            likes: 12,
            tags: ["listening", "practice", "conversation"]
        },
        {
            id: 301,
            title: "Calculus problem help",
            content: "I'm stuck on problem 15 from chapter 3. It's about derivatives of trigonometric functions. Here's the problem: f(x) = sin(x)cos(x)",
            category: "math",
            author: "MathStudent22",
            date: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
            replies: 4,
            views: 28,
            likes: 2,
            tags: ["calculus", "derivatives", "trigonometry"]
        },
        {
            id: 302,
            title: "Study group for algebra final",
            content: "Forming a study group to prepare for the algebra final exam. Meeting online this weekend. All levels welcome!",
            category: "math",
            author: "AlgebraFan",
            date: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            replies: 7,
            views: 35,
            likes: 9,
            tags: ["algebra", "study-group", "exam"]
        }
    ];
}

/**
 * Display threads in their respective categories
 */
function displayThreads(threads) {
    const englishContainer = document.getElementById('english-threads');
    const japaneseContainer = document.getElementById('japanese-threads');
    const mathContainer = document.getElementById('math-threads');
    
    // Clear existing content
    englishContainer.innerHTML = '';
    japaneseContainer.innerHTML = '';
    mathContainer.innerHTML = '';
    
    // Sort threads by date (newest first)
    threads.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    threads.forEach(thread => {
        const threadElement = createThreadElement(thread);
        
        switch(thread.category) {
            case 'english':
                englishContainer.appendChild(threadElement);
                break;
            case 'japanese':
                japaneseContainer.appendChild(threadElement);
                break;
            case 'math':
                mathContainer.appendChild(threadElement);
                break;
            default:
                // If category doesn't match, add to general
                englishContainer.appendChild(threadElement);
        }
    });
}

/**
 * Create thread element with new card design
 */
function createThreadElement(thread) {
    const threadItem = document.createElement('div');
    threadItem.className = 'card';
    threadItem.setAttribute('data-thread-id', thread.id);
    
    const date = new Date(thread.date);
    const timeAgo = getTimeAgo(date);
    
    threadItem.innerHTML = `
        <div class="header">
            <span class="icon">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fill-rule="evenodd"></path>
                </svg>
            </span>
            <p class="alert">${thread.title}</p>
        </div>

        <p class="message">
            ${thread.content}
        </p>

        <div class="thread-meta">
            <span class="thread-author">Posted by: ${thread.author}</span>
            <span class="thread-date">${timeAgo}</span>
            <span class="thread-replies">${thread.replies} replies</span>
        </div>

        <div class="actions">
            <a class="read view-thread-btn" data-thread-id="${thread.id}">
                Take a Look
            </a>
        </div>
    `;
    
    return threadItem;
}

/**
 * Get time ago string
 */
function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
}

/**
 * Initialize thread navigation
 */
function initializeThreadNavigation() {
    // Use event delegation for thread items
    document.addEventListener('click', function(e) {
        const viewThreadBtn = e.target.closest('.view-thread-btn');
        
        if (viewThreadBtn) {
            const threadId = viewThreadBtn.getAttribute('data-thread-id');
            viewThread(threadId);
        }
    });
}

/**
 * View thread details
 * @param {string} threadId - The ID of the thread to view
 */
function viewThread(threadId) {
    const threads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
    const thread = threads.find(t => t.id == threadId);
    
    if (!thread) {
        showNotification('Thread not found', 'error');
        return;
    }
    
    // Increment view count
    thread.views++;
    localStorage.setItem('forumThreads', JSON.stringify(threads));
    
    showThreadDetail(thread);
}

/**
 * Show thread detail view with new GUI
 */
function showThreadDetail(thread) {
    const replies = JSON.parse(localStorage.getItem(`forumReplies_${thread.id}`) || '[]');
    const isLiked = getLikeState(thread.id);
    const likeClass = isLiked ? 'liked' : '';
    
    let threadDetailHTML = `
        <div class="thread-detail-view" data-thread-id="${thread.id}">
            <div class="thread-detail-header">
                <button class="btn secondary back-to-threads">← Back to Threads</button>
                <h2>${thread.title}</h2>
                <div class="thread-detail-meta">
                    <span class="thread-category ${thread.category}">${getCategoryLabel(thread.category)}</span>
                    <span class="thread-author">By: ${thread.author}</span>
                    <span class="thread-date">${new Date(thread.date).toLocaleDateString()}</span>
                </div>
            </div>
            
            <div class="card thread-detail-card">
                <span class="title">Discussion</span>
                <div class="comments">
                    <div class="comment-react">
                        <button class="${likeClass}">
                            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"></path>
                            </svg>
                        </button>
                        <hr>
                        <span>${thread.likes || 0}</span>
                    </div>
                    <div class="comment-container">
                        <div class="user">
                            <div class="user-pic">
                                <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linejoin="round" fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
                                    <path stroke-width="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
                                </svg>
                            </div>
                            <div class="user-info">
                                <span>${thread.author}</span>
                                <p>${new Date(thread.date).toLocaleString()}</p>
                            </div>
                        </div>
                        <p class="comment-content">
                            ${thread.content}
                        </p>
                    </div>
                </div>
    `;
    
    // Add replies
    replies.forEach(reply => {
        const replyLikes = reply.likes || 0;
        const replyIsLiked = getLikeState(`reply_${reply.id}`);
        const replyLikeClass = replyIsLiked ? 'liked' : '';
        
        threadDetailHTML += `
            <div class="comments">
                <div class="comment-react">
                    <button class="${replyLikeClass}" data-reply-id="${reply.id}">
                        <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"></path>
                        </svg>
                    </button>
                    <hr>
                    <span>${replyLikes}</span>
                </div>
                <div class="comment-container">
                    <div class="user">
                        <div class="user-pic">
                            <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linejoin="round" fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
                                <path stroke-width="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
                            </svg>
                        </div>
                        <div class="user-info">
                            <span>${reply.author}</span>
                            <p>${new Date(reply.date).toLocaleString()}</p>
                        </div>
                    </div>
                    <p class="comment-content">
                        ${reply.content}
                    </p>
                </div>
            </div>
        `;
    });
    
    threadDetailHTML += `
                <div class="text-box">
                    <div class="box-container">
                        <textarea id="reply-content-${thread.id}" placeholder="Write your reply..."></textarea>
                        <div>
                            <div class="formatting">
                                <button type="submit" class="send post-reply-btn" data-thread-id="${thread.id}" title="Send">
                                    <svg fill="none" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#ffffff" d="M12 5L12 20"></path>
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#ffffff" d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Hide thread list and show detail
    document.querySelector('.thread-list-section').classList.add('hidden');
    document.querySelector('.new-thread-section').classList.add('hidden');
    
    const detailSection = document.querySelector('.thread-detail-section') || createDetailSection();
    detailSection.innerHTML = threadDetailHTML;
    detailSection.classList.remove('hidden');
    
    // Add event listeners
    initializeThreadDetailEvents(thread.id);
}

/**
 * Create thread detail section if it doesn't exist
 */
function createDetailSection() {
    const section = document.createElement('section');
    section.className = 'thread-detail-section hidden';
    document.querySelector('main').appendChild(section);
    return section;
}

/**
 * Initialize thread detail events
 */
function initializeThreadDetailEvents(threadId) {
    // Back button
    document.querySelector('.back-to-threads').addEventListener('click', function() {
        document.querySelector('.thread-detail-section').classList.add('hidden');
        document.querySelector('.thread-list-section').classList.remove('hidden');
        document.querySelector('.new-thread-section').classList.remove('hidden');
    });
    
    // Post reply button
    document.querySelector('.post-reply-btn').addEventListener('click', function() {
        postReply(threadId);
    });
    
    // Initialize like buttons for replies
    document.querySelectorAll('.comment-react button[data-reply-id]').forEach(button => {
        button.addEventListener('click', function() {
            handleReplyLikeClick(this);
        });
    });
}

/**
 * Handle reply like button click
 */
function handleReplyLikeClick(likeBtn) {
    const replyId = likeBtn.getAttribute('data-reply-id');
    const likeCountSpan = likeBtn.parentNode.querySelector('span');
    let likeCount = parseInt(likeCountSpan.textContent) || 0;
    
    if (likeBtn.classList.contains('liked')) {
        // Unlike
        likeCount--;
        likeBtn.classList.remove('liked');
    } else {
        // Like
        likeCount++;
        likeBtn.classList.add('liked');
    }
    
    likeCountSpan.textContent = likeCount;
    
    // Save like state to localStorage
    saveLikeState(`reply_${replyId}`, likeBtn.classList.contains('liked'));
}

/**
 * Get category label
 */
function getCategoryLabel(category) {
    const labels = {
        'english': 'English',
        'japanese': 'Japanese',
        'math': 'Mathematics',
        'general': 'General',
        'resources': 'Resources',
        'study-groups': 'Study Groups'
    };
    return labels[category] || 'General';
}

/**
 * Post a reply to a thread
 */
function postReply(threadId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
        showNotification('Please log in to post a reply', 'error');
        return;
    }
    
    const replyContent = document.getElementById(`reply-content-${threadId}`).value.trim();
    
    if (!replyContent) {
        showNotification('Please enter a reply', 'error');
        return;
    }
    
    const replies = JSON.parse(localStorage.getItem(`forumReplies_${threadId}`) || '[]');
    const newReply = {
        id: replies.length + 1,
        content: replyContent,
        author: currentUser.firstName || currentUser.username,
        date: new Date().toISOString(),
        threadId: parseInt(threadId),
        likes: 0
    };
    
    replies.push(newReply);
    localStorage.setItem(`forumReplies_${threadId}`, JSON.stringify(replies));
    
    // Update thread reply count
    const threads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
    const thread = threads.find(t => t.id == threadId);
    if (thread) {
        thread.replies = replies.length;
        localStorage.setItem('forumThreads', JSON.stringify(threads));
    }
    
    // Update UI
    document.getElementById(`reply-content-${threadId}`).value = '';
    
    // Reload thread detail view
    viewThread(threadId);
    
    showNotification('Reply posted successfully', 'success');
}

/**
 * Initialize new thread form
 */
function initializeNewThreadForm() {
    const newThreadForm = document.getElementById('new-thread-form');
    const newThreadBtn = document.getElementById('new-thread-btn');
    const newThreadSection = document.getElementById('new-thread-section');
    const cancelThreadBtn = document.getElementById('cancel-thread');
    
    if (newThreadForm) {
        newThreadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateThreadForm(this)) {
                createNewThread(this);
            }
        });
    }
    
    if (newThreadBtn && newThreadSection) {
        newThreadBtn.addEventListener('click', function() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
            
            if (!currentUser) {
                showNotification('Please log in to create a thread', 'error');
                window.location.href = 'login.html';
                return;
            }
            
            newThreadSection.classList.toggle('hidden');
            
            if (!newThreadSection.classList.contains('hidden')) {
                newThreadSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (cancelThreadBtn) {
        cancelThreadBtn.addEventListener('click', function() {
            document.getElementById('new-thread-form').reset();
            document.getElementById('new-thread-section').classList.add('hidden');
        });
    }
}

/**
 * Validate thread form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid
 */
function validateThreadForm(form) {
    const titleInput = form.querySelector('#thread-title');
    const contentInput = form.querySelector('#thread-content');
    let isValid = true;
    
    if (!titleInput.value.trim()) {
        markFieldAsInvalid(titleInput, 'Please enter a title for your thread');
        isValid = false;
    } else {
        markFieldAsValid(titleInput);
    }
    
    if (!contentInput.value.trim()) {
        markFieldAsInvalid(contentInput, 'Please enter content for your thread');
        isValid = false;
    } else {
        markFieldAsValid(contentInput);
    }
    
    return isValid;
}

/**
 * Create a new thread
 * @param {HTMLFormElement} form - The form containing thread data
 */
function createNewThread(form) {
    const titleInput = form.querySelector('#thread-title');
    const categoryInput = form.querySelector('#thread-category');
    const contentInput = form.querySelector('#thread-content');
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
        showNotification('Please log in to create a thread', 'error');
        return;
    }
    
    const newThread = {
        title: titleInput.value.trim(),
        category: categoryInput.value,
        content: contentInput.value.trim(),
        author: currentUser.firstName || currentUser.username,
        tags: extractTags(contentInput.value)
    };
    
    // Save thread
    const savedThread = saveThread(newThread);
    
    showNotification('Thread created successfully', 'success');
    
    // Reset form
    form.reset();
    
    // Hide form
    document.getElementById('new-thread-section').classList.add('hidden');
    
    // Reload threads
    loadThreads();
}

/**
 * Extract tags from content
 */
function extractTags(content) {
    const tagRegex = /#(\w+)/g;
    const matches = content.match(tagRegex);
    return matches ? matches.map(tag => tag.substring(1)).slice(0, 3) : [];
}

/**
 * Save thread to storage
 */
function saveThread(thread) {
    let threads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
    
    // Generate new ID
    const newId = threads.length > 0 ? Math.max(...threads.map(t => t.id)) + 1 : 1;
    thread.id = newId;
    thread.date = new Date().toISOString();
    thread.replies = 0;
    thread.views = 0;
    thread.likes = 0;
    
    threads.push(thread);
    localStorage.setItem('forumThreads', JSON.stringify(threads));
    
    return thread;
}

/**
 * Initialize search functionality
 */
function initializeSearchFunctionality() {
    const searchForm = document.getElementById('forum-search');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                searchThreads(searchTerm);
            }
        });
    }
}

/**
 * Search threads
 * @param {string} searchTerm - The search term
 */
function searchThreads(searchTerm) {
    const threads = JSON.parse(localStorage.getItem('forumThreads') || '[]');
    const results = threads.filter(thread => 
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (thread.tags && thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
    
    displaySearchResults(results, searchTerm);
}

/**
 * Display search results
 * @param {Array} results - The search results
 * @param {string} searchTerm - The search term
 */
function displaySearchResults(results, searchTerm) {
    const resultsContainer = document.getElementById('search-results');
    const threadsContainer = document.querySelector('.thread-list-section');
    
    if (!resultsContainer) {
        createSearchResultsSection();
    }
    
    const finalResultsContainer = document.getElementById('search-results');
    
    if (finalResultsContainer && threadsContainer) {
        // Hide regular threads
        threadsContainer.classList.add('hidden');
        document.querySelector('.new-thread-section').classList.add('hidden');
        
        // Show results container
        finalResultsContainer.classList.remove('hidden');
        
        // Clear previous results
        finalResultsContainer.innerHTML = '';
        
        // Add results title
        const resultsTitle = document.createElement('h2');
        resultsTitle.textContent = `Search Results for "${searchTerm}"`;
        resultsTitle.className = 'section-title';
        finalResultsContainer.appendChild(resultsTitle);
        
        // Add results
        if (results.length > 0) {
            results.forEach(function(thread) {
                const threadElement = createThreadElement(thread);
                finalResultsContainer.appendChild(threadElement);
            });
        } else {
            // No results message
            const noResults = document.createElement('p');
            noResults.textContent = 'No threads found matching your search.';
            noResults.className = 'no-results';
            finalResultsContainer.appendChild(noResults);
        }
        
        // Add clear search button
        const clearSearch = document.createElement('button');
        clearSearch.classList.add('btn');
        clearSearch.textContent = 'Clear Search';
        clearSearch.addEventListener('click', function() {
            finalResultsContainer.classList.add('hidden');
            threadsContainer.classList.remove('hidden');
            document.querySelector('.new-thread-section').classList.remove('hidden');
            document.getElementById('forum-search').reset();
        });
        
        finalResultsContainer.appendChild(clearSearch);
    }
}

/**
 * Create search results section if it doesn't exist
 */
function createSearchResultsSection() {
    const section = document.createElement('section');
    section.className = 'search-results-section hidden';
    section.id = 'search-results';
    document.querySelector('main').appendChild(section);
    return section;
}

/**
 * Mark field as invalid
 * @param {HTMLElement} field - The form field
 * @param {string} message - The error message
 */
function markFieldAsInvalid(field, message) {
    // Remove any existing error
    markFieldAsValid(field);
    
    // Add error class
    field.classList.add('invalid');
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.classList.add('field-error');
    errorElement.textContent = message;
    
    // Insert after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

/**
 * Mark field as valid
 * @param {HTMLElement} field - The form field
 */
function markFieldAsValid(field) {
    // Remove error class
    field.classList.remove('invalid');
    
    // Remove any existing error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Show notification message
 * @param {string} message - The notification message
 * @param {string} type - 'success', 'error', or 'info'
 */
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(type);
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(function() {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 5 seconds
    setTimeout(function() {
        notification.classList.remove('show');
        
        // Remove after animation completes
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 5000);
}