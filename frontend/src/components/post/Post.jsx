import { useNavigate } from 'react-router-dom';
import dateToWordsFormat from '../../utils/dates';
import './Post.css'

export default function Post({post}) {
  const categories = ['tutorial', 'godot', 'design'];

  const navigate = useNavigate();
  const goToPost = (e) => {
    e.preventDefault();
    navigate(`/posts/${post._id}`);
  }

  return (
    <div className='post' onClick={goToPost}>
        <div className="post-info">
            <span className='post-title'>{post.title}</span>
            <div className='details'>
              <span className='post-date'>{dateToWordsFormat(post.createdAt)}</span>
              <p className='seperator'> - </p>
              <div className="post-categories">
                {categories.map((c) => (
                  <span key={c} className='post-category'>{c} ·</span>
                ))}
              </div>
            </div>
        </div>
        <hr />
    </div>
  )
}
