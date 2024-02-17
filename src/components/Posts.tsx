
'use client'
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost,updatePost } from "@/redux/slices/postsSlice";
import { useEffect, useState } from "react";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [postIdToEdit, setPostIdToEdit] = useState("");
  const [initialized, setInitialized] = useState(false); // Track initialization
  const posts = useSelector((state: any) => state.posts);
  const [post,setPost]=useState([])
  const dispatch = useDispatch();

  const handleAddPost = (e: any) => {
    e.preventDefault();

    if (!title && !description) return;

    const newPost = {
      id: Date.now().toString(), // Convert ID to string
      title,
      description,
    };

    dispatch(addPost(newPost));

    // Reset form fields again empty
    setTitle('');
    setDescription('');
  };

  const handleRemovePost = (postId: any) => {
    dispatch(deletePost(postId));
  };

  const handleUpdatePost = () => {
    const updatedPost = {
      id: postIdToEdit,
      title,
      description,
    };

    dispatch(updatePost(updatedPost));

    // Reset form fields and close edit mode like initial stage
    setTitle('');
    setDescription('');
    setEditMode(false);
    setPostIdToEdit("");
  };

  const handleEditPost = (post: any) => {
    setEditMode(true);
    setPostIdToEdit(post.id);
    setTitle(post.title);
    setDescription(post.description);
  };

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts && !initialized) {
      setPost(JSON.parse(storedPosts));
      setInitialized(true); // Update initialization state
    }
  }, [initialized]); // Run effect only when initialized changes

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }, [initialized, posts]);

  return (
    <div className="max-w-4xl mx-auto py-8 bg-gray-400">
      <form className="flex flex-col space-y-4" onSubmit={handleAddPost}>
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 text-blue-700"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 text-blue-700"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="bg-purple-700 text-white rounded-md px-4 py-2" onClick={handleAddPost}>Add New Post</button>
      </form>
      <h1 className="text-2xl font-bold mt-6">Posts</h1>
      {posts ? (//if there is post then go for edit
        posts.map((post: any) => (
          <div key={post.id} className="border border-gray-300 p-4 my-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="mt-2">{post.description}</p>
            <div className="flex mt-4">
              <button
                className="bg-orange-600 text-white rounded-md px-4 py-2 mr-2"
                onClick={() => handleEditPost(post)}
              >
                Edit
              </button>
              <button
                className="bg-green-600 text-white rounded-md px-4 py-2"
                onClick={() => handleRemovePost(post.id)}
              >
                Delete
              </button>
            </div>
            {editMode && postIdToEdit === post.id && (//if editmode true and match the id with the storage then can update otherwise not
              <div className="mt-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
                ></textarea>
                <button
                  className="bg-green-500 text-white rounded-md px-4 py-2 mt-2"
                  onClick={handleUpdatePost}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
