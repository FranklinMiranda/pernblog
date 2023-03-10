import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';
import Context from '../utils/context';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import cardHeader from '@material-ui/core/CardHeader';

import '../App.css';
import '../styles/pagination.css';

const Posts = (props) => {
  const context = useContext(Context);

  const [stateLocal, setState] = useState({
    posts: [],
    fetched: false,
    first_page_load: false,
    pages_slice: [1, 2, 3, 4, 5],
    max_page: null,
    items_per_page: 3,
    currentPage: 1,
    num_posts: null,
    posts_slice: null,
    posts_search: [],
    posts_per_page: 3,
  });

  useEffect(() => {
    if (!context.postsState) {
      axios
        .get('/api/get/allposts')
        .then((res) => context.handleAddPosts(res.data))
        .catch((err) => console.log(err));
    }
    if (context.postsState && !stateLocal.fetched) {
      const indexOfLastPost = 1 * stateLocal.posts_per_page;
      const indexOfFirstPost = indexOfLastPost - stateLocal.posts_per_page;
      const last_page = Math.ceil(context.postsState.length / stateLocal.posts_per_page);

      setState({
        ...stateLocal,
        fetched: true,
        posts: [...context.postsState],
        num_posts: context.postsState.length,
        max_page: last_page,
        posts_slice: context.postsState.slice(indexOfFirstPost, indexOfLastPost),
      });
    }
  }, [context, stateLocal]);

  useEffect(() => {
    let page = stateLocal.currentPage;
    let indexOfLastPost = page * 3;
    let indexOfFirstPost = indexOfLastPost - 3;

    setState({ ...stateLocal, posts_slice: stateLocal.posts.slice(indexOfFirstPost, indexOfLastPost) });
  }, [stateLocal.currentPage]); //eslint-disable-line

  const add_search_posts_to_state = (posts) => {
    setState({...stateLocal, posts_search: []});
    setState({...stateLocal, posts_search: [...posts]})
  }

  const handleSearch = (event) => {
    setState({...stateLocal, posts_search: []});
    const search_query = event.target.value
    axios.get("/api/get/searchpost", {params: {search_query: search_query}})
        .then(res => res.data.length !== 0 ? add_search_posts_to_state(res.data) : null)
        .catch(function (error) {
            console.log(error);
        })
  }

const RenderPosts = post => (
   
)


};
