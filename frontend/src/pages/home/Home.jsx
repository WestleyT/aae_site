import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import './Home.css';

export default function Home() {

  //just testing get requests with users for now since that's the table I have at the moment
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await axios.get("/posts");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log('posts ', posts)
  }, [posts]);

  return (
    <>
      <Header></Header>
      <div className='home'>
        <Posts posts={posts}/>
      </div>
    </>
  )
}
