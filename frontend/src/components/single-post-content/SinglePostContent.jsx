import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dateToWordsFormat from '../../utils/dates';
import './SinglePostContent.css';

export default function SinglePostContent() {

  const [content, setContent] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchContent = async() => {
      const response = await axios.get(`/posts/${params.postId}`);
      setContent(response.data);
    };
    fetchContent();
  }, []);

  const markup = {__html: content.body};

  let monthName = '';
  let authorName = '';
  if (Object.keys(content).length > 0) {
    monthName = dateToWordsFormat(content.createdAt);
    authorName = `${content.userId.firstName} ${content.userId.lastName}`;
  }

  return (
    <div className='single-post-content'>
        <div className='single-post-wrapper'>
            <h1 className="single-post-title">{content.title}</h1>
            <div className="single-post-info">
                <span className='single-post-author'>by {authorName}</span>
                <span className='single-post-date'>{monthName}</span>
            </div>
            <div className='post-content-div' dangerouslySetInnerHTML={markup}></div>
        </div>
    </div>
  )
}
