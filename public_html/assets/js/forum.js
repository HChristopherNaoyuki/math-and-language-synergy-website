// forum.js - Forum functionality for Math and Language Synergy website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function()
{
    // Initialize forum functionality
    initializeForum();
});

/**
 * Initialize forum functionality
 */
function initializeForum()
{
    initializeThreadNavigation();
    initializePostActions();
    initializeNewThreadForm();
    initializeSearchFunctionality();
}

/**
 * Initialize thread navigation
 */
function initializeThreadNavigation()
{
    const threadItems = document.querySelectorAll('.thread-item');
    
    threadItems.forEach(function(thread)
    {
        thread.addEventListener('click', function(e)
        {
            // Don't trigger if clicking on action buttons
            if (!e.target.classList.contains('btn') && !e.target.classList.contains('thread-actions'))
            {
                const threadId = this.getAttribute('data-thread-id');
                viewThread(threadId);
            }
        });
    });
}

/**
 * Initialize post actions (like, reply)
 */
function initializePostActions()
{
    // Like buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(function(button)
    {
        button.addEventListener('click', function()
        {
            const postId = this.getAttribute('data-post-id');
            toggleLike(postId, this);
        });
    });
    
    // Reply buttons
    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(function(button)
    {
        button.addEventListener('click', function()
        {
            const postId = this.getAttribute('data-post-id');
            const postAuthor = this.getAttribute('data-author');
            showReplyForm(postId, postAuthor);
        });
    });
}

/**
 * Initialize new thread form
 */
function initializeNewThreadForm()
{
    const newThreadForm = document.getElementById('new-thread-form');
    
    if (newThreadForm)
    {
        newThreadForm.addEventListener('submit', function(e)
        {
            e.preventDefault();
            
            if (validateThreadForm(this))
            {
                createNewThread(this);
            }
        });
    }
    
    // Toggle new thread form
    const newThreadBtn = document.getElementById('new-thread-btn');
    const newThreadSection = document.getElementById('new-thread-section');
    
    if (newThreadBtn && newThreadSection)
    {
        newThreadBtn.addEventListener('click', function()
        {
            newThreadSection.classList.toggle('hidden');
            
            if (!newThreadSection.classList.contains('hidden'))
            {
                newThreadSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Initialize search functionality
 */
function initializeSearchFunctionality()
{
    const searchForm = document.getElementById('forum-search');
    
    if (searchForm)
    {
        searchForm.addEventListener('submit', function(e)
        {
            e.preventDefault();
            
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm)
            {
                searchThreads(searchTerm);
            }
        });
    }
}

/**
 * View thread details
 * @param {string} threadId - The ID of the thread to view
 */
function viewThread(threadId)
{
    // In a real application, this would fetch thread data from a server
    // For this demo, we'll simulate loading thread details
    
    showNotification('Loading thread...', 'info');
    
    setTimeout(function()
    {
        // Hide thread list and show thread detail
        document.querySelector('.thread-list-section').classList.add('hidden');
        document.querySelector('.thread-detail-section').classList.remove('hidden');
        
        // Update thread title and content (simulated)
        document.getElementById('thread-title').textContent = 'Thread Title for ID: ' + threadId;
        document.getElementById('thread-content').textContent = 'This is the content of the thread with ID: ' + threadId + '. This is a simulated response for demonstration purposes.';
        
        // Update back button
        const backButton = document.getElementById('back-to-threads');
        if (backButton)
        {
            backButton.setAttribute('data-thread-id', threadId);
        }
        
        // Load replies (simulated)
        loadReplies(threadId);
    }, 500);
}

/**
 * Load replies for a thread
 * @param {string} threadId - The ID of the thread
 */
function loadReplies(threadId)
{
    const repliesContainer = document.getElementById('thread-replies');
    
    if (repliesContainer)
    {
        // Clear existing replies
        repliesContainer.innerHTML = '';
        
        // Simulated replies data
        const replies = [
            {
                id: 1,
                author: 'Student One',
                content: 'This is a great question! I had the same issue last semester.',
                date: '2 days ago',
                likes: 3
            },
            {
                id: 2,
                author: 'Tutor Assistant',
                content: 'The solution to this problem can be found in chapter 5 of your textbook.',
                date: '1 day ago',
                likes: 5
            },
            {
                id: 3,
                author: 'Student Two',
                content: 'Thanks for the help! This clarified things for me.',
                date: '12 hours ago',
                likes: 1
            }
        ];
        
        // Add replies to container
        replies.forEach(function(reply)
        {
            const replyElement = document.createElement('div');
            replyElement.classList.add('reply');
            replyElement.innerHTML = `
                <div class="reply-header">
                    <span class="reply-author">${reply.author}</span>
                    <span class="reply-date">${reply.date}</span>
                </div>
                <div class="reply-content">${reply.content}</div>
                <div class="reply-actions">
                    <button class="btn like-btn" data-post-id="${reply.id}">
                        <span class="like-count">${reply.likes}</span> Likes
                    </button>
                    <button class="btn reply-btn" data-post-id="${reply.id}" data-author="${reply.author}">
                        Reply
                    </button>
                </div>
            `;
            
            repliesContainer.appendChild(replyElement);
        });
        
        // Re-initialize action buttons for new replies
        initializePostActions();
    }
}

/**
 * Toggle like on a post
 * @param {string} postId - The ID of the post
 * @param {HTMLElement} button - The like button element
 */
function toggleLike(postId, button)
{
    const likeCount = button.querySelector('.like-count');
    let count = parseInt(likeCount.textContent);
    
    if (button.classList.contains('liked'))
    {
        count--;
        button.classList.remove('liked');
        showNotification('Like removed', 'info');
    }
    else
    {
        count++;
        button.classList.add('liked');
        showNotification('Post liked', 'success');
    }
    
    likeCount.textContent = count;
}

/**
 * Show reply form
 * @param {string} postId - The ID of the post being replied to
 * @param {string} postAuthor - The author of the post being replied to
 */
function showReplyForm(postId, postAuthor)
{
    // Remove any existing reply forms
    const existingForms = document.querySelectorAll('.reply-form');
    existingForms.forEach(function(form)
    {
        form.remove();
    });
    
    // Create reply form
    const replyForm = document.createElement('div');
    replyForm.classList.add('reply-form');
    replyForm.innerHTML = `
        <h4>Replying to ${postAuthor}</h4>
        <textarea placeholder="Type your reply here..." rows="3"></textarea>
        <div class="form-actions">
            <button class="btn secondary cancel-reply">Cancel</button>
            <button class="btn submit-reply">Post Reply</button>
        </div>
    `;
    
    // Find the post to reply to and insert form after it
    const postElement = document.querySelector(`[data-post-id="${postId}"]`).closest('.reply');
    postElement.appendChild(replyForm);
    
    // Add event listeners
    const cancelButton = replyForm.querySelector('.cancel-reply');
    const submitButton = replyForm.querySelector('.submit-reply');
    const textarea = replyForm.querySelector('textarea');
    
    cancelButton.addEventListener('click', function()
    {
        replyForm.remove();
    });
    
    submitButton.addEventListener('click', function()
    {
        const content = textarea.value.trim();
        
        if (content)
        {
            postReply(postId, content);
            replyForm.remove();
        }
        else
        {
            showNotification('Please enter a reply', 'error');
        }
    });
    
    // Focus on textarea
    textarea.focus();
}

/**
 * Post a reply
 * @param {string} postId - The ID of the post being replied to
 * @param {string} content - The content of the reply
 */
function postReply(postId, content)
{
    // Simulate API call
    showNotification('Posting reply...', 'info');
    
    setTimeout(function()
    {
        showNotification('Reply posted successfully', 'success');
        
        // In a real application, we would update the UI with the new reply
        // For this demo, we'll just reload the replies
        const threadId = document.getElementById('back-to-threads').getAttribute('data-thread-id');
        if (threadId)
        {
            loadReplies(threadId);
        }
    }, 1000);
}

/**
 * Validate thread form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - True if form is valid
 */
function validateThreadForm(form)
{
    const titleInput = form.querySelector('#thread-title');
    const contentInput = form.querySelector('#thread-content');
    let isValid = true;
    
    if (!titleInput.value.trim())
    {
        markFieldAsInvalid(titleInput, 'Please enter a title for your thread');
        isValid = false;
    }
    else
    {
        markFieldAsValid(titleInput);
    }
    
    if (!contentInput.value.trim())
    {
        markFieldAsInvalid(contentInput, 'Please enter content for your thread');
        isValid = false;
    }
    else
    {
        markFieldAsValid(contentInput);
    }
    
    return isValid;
}

/**
 * Create a new thread
 * @param {HTMLFormElement} form - The form containing thread data
 */
function createNewThread(form)
{
    const titleInput = form.querySelector('#thread-title');
    const contentInput = form.querySelector('#thread-content');
    
    // Simulate API call
    showNotification('Creating new thread...', 'info');
    
    setTimeout(function()
    {
        showNotification('Thread created successfully', 'success');
        
        // Reset form
        form.reset();
        
        // Hide form
        document.getElementById('new-thread-section').classList.add('hidden');
        
        // In a real application, we would add the new thread to the list
        // For this demo, we'll just show a success message
    }, 1000);
}

/**
 * Search threads
 * @param {string} searchTerm - The search term
 */
function searchThreads(searchTerm)
{
    // Simulate API call
    showNotification(`Searching for "${searchTerm}"...`, 'info');
    
    setTimeout(function()
    {
        // Simulate search results
        const results = [
            { id: 101, title: `Search result 1 for ${searchTerm}`, preview: 'This is a preview of the search result...' },
            { id: 102, title: `Search result 2 for ${searchTerm}`, preview: 'This is another preview of the search result...' }
        ];
        
        // Display results
        displaySearchResults(results, searchTerm);
    }, 1000);
}

/**
 * Display search results
 * @param {Array} results - The search results
 * @param {string} searchTerm - The search term
 */
function displaySearchResults(results, searchTerm)
{
    const resultsContainer = document.getElementById('search-results');
    const threadsContainer = document.querySelector('.thread-list');
    
    if (resultsContainer && threadsContainer)
    {
        // Hide regular threads
        threadsContainer.classList.add('hidden');
        
        // Show results container
        resultsContainer.classList.remove('hidden');
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Add results title
        const resultsTitle = document.createElement('h3');
        resultsTitle.textContent = `Search Results for "${searchTerm}"`;
        resultsContainer.appendChild(resultsTitle);
        
        // Add results
        if (results.length > 0)
        {
            results.forEach(function(result)
            {
                const resultElement = document.createElement('div');
                resultElement.classList.add('thread-item');
                resultElement.setAttribute('data-thread-id', result.id);
                resultElement.innerHTML = `
                    <h4>${result.title}</h4>
                    <p>${result.preview}</p>
                `;
                
                resultsContainer.appendChild(resultElement);
            });
            
            // Add event listeners to result items
            const resultItems = resultsContainer.querySelectorAll('.thread-item');
            resultItems.forEach(function(item)
            {
                item.addEventListener('click', function()
                {
                    const threadId = this.getAttribute('data-thread-id');
                    viewThread(threadId);
                });
            });
        }
        else
        {
            // No results message
            const noResults = document.createElement('p');
            noResults.textContent = 'No threads found matching your search.';
            resultsContainer.appendChild(noResults);
        }
        
        // Add clear search button
        const clearSearch = document.createElement('button');
        clearSearch.classList.add('btn');
        clearSearch.textContent = 'Clear Search';
        clearSearch.addEventListener('click', function()
        {
            resultsContainer.classList.add('hidden');
            threadsContainer.classList.remove('hidden');
            document.getElementById('forum-search').reset();
        });
        
        resultsContainer.appendChild(clearSearch);
    }
}

/**
 * Mark field as invalid
 * @param {HTMLElement} field - The form field
 * @param {string} message - The error message
 */
function markFieldAsInvalid(field, message)
{
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
function markFieldAsValid(field)
{
    // Remove error class
    field.classList.remove('invalid');
    
    // Remove any existing error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement)
    {
        errorElement.remove();
    }
}

/**
 * Show notification message
 * @param {string} message - The notification message
 * @param {string} type - 'success', 'error', or 'info'
 */
function showNotification(message, type)
{
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification)
    {
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
    setTimeout(function()
    {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 5 seconds
    setTimeout(function()
    {
        notification.classList.remove('show');
        
        // Remove after animation completes
        setTimeout(function()
        {
            notification.remove();
        }, 300);
    }, 5000);
}

// Update the initializeNewThreadForm function
function initializeNewThreadForm() {
    const newThreadForm = document.getElementById('new-thread-form');
    
    if (newThreadForm) {
        newThreadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateThreadForm(this)) {
                createNewThread(this);
            }
        });
    }
    
    // Toggle new thread form
    const newThreadBtn = document.getElementById('new-thread-btn');
    const newThreadSection = document.getElementById('new-thread-section');
    const cancelThreadBtn = document.getElementById('cancel-thread');
    
    if (newThreadBtn && newThreadSection) {
        newThreadBtn.addEventListener('click', function() {
            newThreadSection.classList.toggle('hidden');
            
            if (!newThreadSection.classList.contains('hidden')) {
                newThreadSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (cancelThreadBtn) {
        cancelThreadBtn.addEventListener('click', function() {
            document.getElementById('new-thread-form').reset();
            newThreadSection.classList.add('hidden');
        });
    }
}