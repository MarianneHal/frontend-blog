import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";


const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

export const fetchPost = createAsyncThunk('posts/fetchPost', async () => {
    const { data } = await instance.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await instance.get('/tags')
    return data
})
export const fetchPopular = createAsyncThunk('posts/fetchPopular', async () => {
    const { data } = await instance.get('/popular')
    return data
})

export const fetchRemovePost = createAsyncThunk('auth/fetchRemovePost', async (id) => instance.delete(`/posts/${id}`))

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
       builder
           .addCase(fetchPost.pending, (state) => {
            state.posts.state = 'loading';
            state.posts.items = [];
        })
           .addCase(fetchPost.fulfilled, (state, action) => {
            state.posts.state = 'loaded';
            state.posts.items = action.payload;
        })
           .addCase(fetchPost.rejected, (state) => {
            state.posts.state = 'error';
            state.posts.items = [];
        });
        builder
            .addCase(fetchTags.pending, (state) => {
            state.tags.state = 'loading';
            state.tags.items = [];
        })
            .addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.state = 'loaded';
            state.tags.items = action.payload;
        })
            .addCase(fetchTags.rejected, (state) => {
            state.tags.state = 'error';
            state.tags.items = [];
        })
        builder
            .addCase(fetchRemovePost.pending, (state, action) => {
                state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
            });
        builder
            .addCase(fetchPopular.pending, (state) => {
                state.posts.state = 'loading';
                state.posts.items = [];
            })
            .addCase(fetchPopular.fulfilled, (state, action) => {
                state.posts.state = 'loaded';
                state.posts.items = action.payload;
            })
            .addCase(fetchPopular.rejected, (state) => {
                state.posts.state = 'error';
                state.posts.items = [];
            })
    }
})

export const postsReducer = postsSlice.reducer