import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";


import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import {fetchPost, fetchTags, fetchPopular} from "../redux/slices/posts";
import {useNavigate, useParams} from "react-router-dom";


export const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const { posts, tags } = useSelector(state => state.posts);
    const isPostsLoading = posts.state === 'loading';
    const isTagsLoading = posts.state === 'loading';
    const navigate = useNavigate();



    useEffect(() => {
       dispatch(fetchPost())
        dispatch(fetchTags())
    },[])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
          <Tab label="New" />
       <Tab label="Popular" onClick={()=>navigate('/popular')}/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
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
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
