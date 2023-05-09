import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchPopular, fetchPost, fetchTags} from "../../redux/slices/posts";
import Grid from "@mui/material/Grid";
import {Post, TagsBlock} from "../../components";

export const Popular = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const { posts } = useSelector(state => state.posts);
    const isPostsLoading = posts.state === 'loading';


    useEffect(() => {
        dispatch(fetchPopular())
    },[])

    return (
        <>
            <Grid xs={8} >
                    {( isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (<Post key={index} isLoading={true}/>) : (
                        <Post
                            id={obj._id}
                            title={obj.title}
                            imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}`: ''}
                            user={obj.user}
                            createdAt={obj.createdAt}
                            viewsCount={obj.viewsCount}
                            commentsCount={3}
                            tags={obj.tags}
                            isEditable = {userData?._id === obj.user._id}
                        />
                    ))}
                </Grid>
        </>
    );
};
