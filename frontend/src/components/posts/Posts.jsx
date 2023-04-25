import Post from '../post/Post';
import './Posts.css';

export default function Posts({ posts, route }) {
  return (
    <div className='posts'>
        {posts.map((p) => (
          <Post key={p._id} route={route} post={p}/>
        ))}
    </div>
  )
}
