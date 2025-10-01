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
 * Create thread element
 */
function createThreadElement(thread) {
    const threadItem = document.createElement('div');
    threadItem.className = 'thread-item';
    threadItem.setAttribute('data-thread-id', thread.id);
    
    const date = new Date(thread.date);
    const timeAgo = getTimeAgo(date);
    const categoryLabel = getCategoryLabel(thread.category);
    
    threadItem.innerHTML = `
        <div class="thread-main">
            <div class="thread-header">
                <span class="thread-category ${thread.category}">${categoryLabel}</span>
                <h4>${thread.title}</h4>
            </div>
            <p>${thread.content}</p>
            <div class="thread-tags">
                ${thread.tags ? thread.tags.map(tag => `<span class="thread-tag">#${tag}</span>`).join('') : ''}
            </div>
            <div class="thread-meta">
                <span class="thread-author">Posted by: ${thread.author}</span>
                <span class="thread-date">${timeAgo}</span>
            </div>
        </div>
        <div class="thread-stats">
            <span class="thread-replies">${thread.replies} replies</span>
            <span class="thread-views">${thread.views} views</span>
            <button class="btn small view-thread-btn" data-thread-id="${thread.id}">View Thread</button>
        </div>
    `;
    
    return threadItem;
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
        const threadItem = e.target.closest('.thread-item');
        const viewThreadBtn = e.target.closest('.view-thread-btn');
        
        if (threadItem && !viewThreadBtn) {
            const threadId = threadItem.getAttribute('data-thread-id');
            viewThread(threadId);
        } else if (viewThreadBtn) {
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
 * Show thread detail view
 */
function showThreadDetail(thread) {
    // Create thread detail view
    const threadDetailHTML = `
        <div class="thread-detail-view">
            <div class="thread-detail-header">
                <button class="btn secondary back-to-threads">← Back to Threads</button>
                <h2>${thread.title}</h2>
                <div class="thread-detail-meta">
                    <span class="thread-category ${thread.category}">${getCategoryLabel(thread.category)}</span>
                    <span class="thread-author">By: ${thread.author}</span>
                    <span class="thread-date">${new Date(thread.date).toLocaleDateString()}</span>
                </div>
            </div>
            
            <div class="thread-detail-content">
                <p>${thread.content}</p>
                <div class="thread-tags">
                    ${thread.tags ? thread.tags.map(tag => `<span class="thread-tag">#${tag}</span>`).join('') : ''}
                </div>
            </div>
            
            <div class="thread-replies-section">
                <h3>Replies (${thread.replies})</h3>
                <div class="replies-list" id="replies-${thread.id}">
                    ${generateRepliesHTML(thread.id)}
                </div>
                
                <div class="add-reply-form">
                    <h4>Post a Reply</h4>
                    <textarea id="reply-content-${thread.id}" placeholder="Type your reply here..." rows="4"></textarea>
                    <button class="btn post-reply-btn" data-thread-id="${thread.id}">Post Reply</button>
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
    });
    
    // Post reply button
    document.querySelector('.post-reply-btn').addEventListener('click', function() {
        postReply(threadId);
    });
}

/**
 * Generate replies HTML
 */
function generateRepliesHTML(threadId) {
    const replies = JSON.parse(localStorage.getItem(`forumReplies_${threadId}`) || '[]');
    
    if (replies.length === 0) {
        return '<p class="no-replies">No replies yet. Be the first to reply!</p>';
    }
    
    return replies.map(reply => `
        <div class="reply-item">
            <div class="reply-header">
                <span class="reply-author">${reply.author}</span>
                <span class="reply-date">${getTimeAgo(new Date(reply.date))}</span>
            </div>
            <div class="reply-content">${reply.content}</div>
        </div>
    `).join('');
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
        threadId: parseInt(threadId)
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
    document.getElementById(`replies-${threadId}`).innerHTML = generateRepliesHTML(threadId);
    
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