// A simple function to get all posts from local storage.
function getPosts() {
    // Retrieve the 'posts' data from local storage.
    // If no posts are found, return an empty array.
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    return posts;
}

// A function to display all the posts on the homepage.
function displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    // Clear any existing content in the container to avoid duplicates.
    postsContainer.innerHTML = '';

    // Get the list of posts.
    const posts = getPosts();

    // Check if there are any posts to display.
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No blog posts found. Create a new post!</p>';
        return;
    }

    // Loop through each post and create HTML for it.
    posts.forEach(post => {
        // Create a new div element for each post.
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        // Use a template literal to create the inner HTML for the post.
        // This includes the post title, content, and action buttons for editing and deleting.
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <div class="post-actions">
                <a href="edit.html?id=${post.id}">Edit</a>
                <button onclick="deletePost('${post.id}')">Delete</button>
            </div>
        `;

        // Add the newly created post element to the container.
        // This will display the post on the homepage.
        postsContainer.appendChild(postElement);
    });
}

// Placeholder function will handle deleting a post.
// We'll implement this later.
function deletePost(id) {
    console.log('Delete post with ID:', id);
}

// Call the function to display posts when the page loads.
displayPosts();