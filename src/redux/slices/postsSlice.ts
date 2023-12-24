import { createSlice,nanoid } from "@reduxjs/toolkit";
// import { nanoid } from "nanoid";

interface Post {
  id: string;
  title: string;
  description: string;
}

const initialState: Post[] = [
  { id: nanoid(), title: 'Post Default', description: 'This is the default Post' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {

    

    addPost: (state, action) => {
      const { title, description } = action.payload as Omit<Post, 'id'>;
      state.push({ id: nanoid(), title, description });
    },

    updatePost: (state, action) => {
      const { id, title, description } = action.payload as Post;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.description = description;
      }
    },


    deletePost: (state, action) => {
      const postId = action.payload as string;
      return state.filter(post => post.id !== postId);
    },
  }
});

export const {  addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
