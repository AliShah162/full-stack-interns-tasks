import { useState, useEffect } from "react";

const TestingApi = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // States for update the post
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  // GET - Fetch posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((errors) => {
        console.log("Error: ", errors);
      });
  }, []);

  // POST - Add new post
  function handleAddpost() {
    if (title === "" || body === "") {
      alert("Please fill in the details of your post");
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success!", data);
        setPosts([data, ...posts]);
        setTitle("");
        setBody("");
      })
      .catch((error) => {
        console.log("Error posting:", error);
      });
  }

  // DELETE - Remove post
  function handleDelete(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Post with id ${id} has been deleted`);
          const newPosts = posts.filter((post) => post.id !== id);
          setPosts(newPosts);
        } else {
          console.log("Failed to delete");
        }
      })
      .catch((error) => {
        console.log("Error deleting:", error);
      });
  }

  // Start editing
  function startEditing(post) {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditBody(post.body);
  }

  // UPDATE - Save edited post (PUT)
  function handleUpdate() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editId,
        title: editTitle,
        body: editBody,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newPosts = posts.map((post) =>
          post.id === editId ? data : post,
        );
        setPosts(newPosts);
        // Clear edit mode
        setEditId(null);
        setEditTitle("");
        setEditBody("");
        console.log("Post updated!", data);
      })
      .catch((error) => {
        console.log("Error updating:", error);
      });
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditId(null);
    setEditTitle("");
    setEditBody("");
  }

  return (
    <div>
      <h1>Add new Post</h1>
      <input
        type="text"
        placeholder="Enter Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        placeholder="Your description here"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      ></textarea>
      <button onClick={handleAddpost}>Add Post</button>

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              {editId === post.id ? (
                //  EDIT MODE UI here.....
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                //  NORMAL MODE UI here....//././././/
                <>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                  <button onClick={() => startEditing(post)}>Edit</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TestingApi;
