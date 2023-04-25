import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import './Drafts.css';

export default function Drafts() {

  const [posts, setPosts] = useState([]);
  const {user} = useContext(Context);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await axios.get(`/posts/drafts/${user._id}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log('posts ', posts)
  }, [posts]);

  return (
    <>
      <Header headerText='Drafts'></Header>
      <div className='drafts'>
        <Posts route='write' posts={posts}/>
      </div>
    </>
  )
}