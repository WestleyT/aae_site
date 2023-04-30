import { useNavigate } from 'react-router-dom';
import dateToWordsFormat from '../../utils/dates';
import './Post.css'

export default function Post({post, route}) {
  const categories = ['tutorial', 'godot', 'design'];

  const navigate = useNavigate();
  const goToPost = (e) => {
    e.preventDefault();
    navigate(`/${route}/${post._id}`);
  }

  return (
    <div className='post' onClick={goToPost}>
        <div className="post-info">
            <span className='post-title'>{post.title}</span>
            <div className='details'>
              <span className='post-date'>{post.publishDate && dateToWordsFormat(post.publishDate)}</span>
              <p className='seperator'> - </p>
              <div className="post-categories">
                {post.tags.map((tag) => (
                  <span key={tag._id} className='post-category'>{tag.name} ·</span>
                ))}
              </div>
            </div>
        </div>
        <hr />
    </div>
  )
}
