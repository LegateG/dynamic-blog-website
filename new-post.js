// A simple function to generate a unique ID for each post.
function generateId() {
    return Date.now().toString();
}

// Function to handle the form submission.
function handleNewPost(event) {
    // Prevent the default form submission behavior (reloading the page).
    event.preventDefault();

    // Get the form elements.
    const titleInput = document.getElementById('post-title');
    const contentInput = document.getElementById('post-content');

    // Get the values from the form.
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // *** Validation Check ***
    // Ensure both title and content are provided.
    if (!title || !content) {
        alert('Please enter both a title and content for your post.');
        return; // Exit the function if validation fails.
    }

    // Create a new post object.
    const newPost = {
        id: generateId(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString() // Add the current date.
    };

    // Get existing posts from local storage.
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Add the new post to the array.
    posts.push(newPost);

    // Save the updated posts array back to local storage.
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear the form fields after successful submission.
    titleInput.value = '';
    contentInput.value = '';

    // Redirect the user back to the homepage.
    window.location.href = 'index.html';
}

// Get the form element.
const form = document.getElementById('new-post-form');

// Add an event listener to the form's 'submit' event.
form.addEventListener('submit', handleNewPost);