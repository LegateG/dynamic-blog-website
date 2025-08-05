// Function to get a single post from local storage by its ID.
function getPostById(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id === postId);
    return post;
}

// Function to get the post ID from the URL query string.
function getPostIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// A global variable to store the current post's ID.
let currentPostId = null;

// Function to display the post details or an error message.
function displayPostDetails() {
    currentPostId = getPostIdFromUrl();
    const postDetailContainer = document.getElementById('post-detail-container');
    const editFormContainer = document.getElementById('edit-form-container');
    
    if (!currentPostId) {
        postDetailContainer.innerHTML = '<p>Error: No post ID specified.</p>';
        editFormContainer.style.display = 'none';
        return;
    }

    const post = getPostById(currentPostId);

    if (!post) {
        postDetailContainer.innerHTML = '<p>Post not found.</p>';
        editFormContainer.style.display = 'none';
        return;
    }
    
    // Displaying the post details.
    postDetailContainer.innerHTML = `
        <div class="blog-post">
            <h2>${post.title}</h2>
            <p><strong>Published:</strong> ${post.date}</p>
            <hr>
            <p>${post.content}</p>
            <div class="post-actions">
                <button id="edit-btn">Edit Post</button>
            </div>
        </div>
    `;

    // Populating the edit form fields with the current post's data.
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;

    // Adding an event listener to the new "Edit Post" button.
    document.getElementById('edit-btn').addEventListener('click', toggleEditMode);
}

// Function to handle showing/hiding the edit form.
function toggleEditMode() {
    const postDetailContainer = document.getElementById('post-detail-container');
    const editFormContainer = document.getElementById('edit-form-container');
    
    postDetailContainer.style.display = 'none'; // Hiding the viewable post.
    editFormContainer.style.display = 'block'; // Showing the edit form.
}

// Function to save the edited post back to local storage.
function savePost(event) {
    event.preventDefault(); // Preventing page reload.

    const newTitle = document.getElementById('edit-title').value.trim();
    const newContent = document.getElementById('edit-content').value.trim();

    if (!newTitle || !newContent) {
        alert('Title and content cannot be empty!');
        return;
    }

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Finding the index of the post to update.
    const postIndex = posts.findIndex(p => p.id === currentPostId);

    if (postIndex !== -1) {
        // Updating the post with the new data.
        posts[postIndex].title = newTitle;
        posts[postIndex].content = newContent;
        
        // Saving the updated array back to local storage.
        localStorage.setItem('posts', JSON.stringify(posts));
        
        // Redirecting back to the homepage to show the updated list.
        window.location.href = 'index.html';
    } else {
        alert('Error: Post not found.');
    }
}

// Adding an event listener to the edit form.
document.getElementById('edit-post-form').addEventListener('submit', savePost);

// Adding an event listener to the "Cancel" button.
document.getElementById('cancel-edit-btn').addEventListener('click', function() {
    // Simply going back to the homepage without saving.
    window.location.href = 'index.html';
});

// Calling the initial function to display the post when the page loads.
displayPostDetails();