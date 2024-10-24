// Add event
add_form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("imageUrl").value;
  const location = document.getElementById("location").value;
  const date = document.getElementById("date").value;

  fetch("https://em-planners-github-io-1.onrender.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
      imageUrl: image,
      location: location,
      date: date,
      comments: [],
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      alert("Event created successfully"); // Use alert directly
      // Optionally, refresh the events list here to see the new event
      fetchEvents();
    });
});

// Delete post function
function deleteEvent(id) {
  fetch(`https://em-planners-github-io-1.onrender.com/posts/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        alert("Event deleted successfully"); // Use alert directly
        // Optionally, refresh the events list here to see the updated list
        fetchEvents();
      } else {
        throw new Error("Failed to delete the event");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to fetch and display events
function fetchEvents() {
  fetch("https://em-planners-github-io-1.onrender.com/posts")
    .then((res) => res.json())
    .then((data) => {
      const posts_row = document.getElementById("posts_row");
      posts_row.innerHTML = ""; // Clear the existing posts
      data.forEach((post) => {
        posts_row.innerHTML += `
          <div class="col-md-3 mb-2">
            <div class="bg-light p-1 border">
              <img src=${post.imageUrl} class="img-fluid" />
              <h6 class="fw-bold">${post.title}</h6>
              <div class="row">
                <p class="col">${post.location}</p>
                <p class="col">${post.date}</p>
              </div>
              <button onclick="deleteEvent(${post.id})" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        `;
      });
    });
}
