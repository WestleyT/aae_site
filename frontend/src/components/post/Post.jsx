import './Post.css'

export default function Post({post}) {
  const markup = {__html: post.body};
  const categories = ['tutorial', 'godot', 'design']
  return (
    <div className='post'>
        {/* <img className='post-image' src='https://as1.ftcdn.net/v2/jpg/01/23/02/00/1000_F_123020051_B6LAmC98wVm1RZifVtqBjrfoMEH0Z0zb.jpg' /> */}
        <div className="post-info">
            <span className='post-title'>{post.title}</span>
            <div className='details'>
              <span className='post-date'>January 2, 2023</span>
              <p className='seperator'> - </p>
              <div className="post-categories">
                {categories.map((c) => (
                  <span className='post-category'>{c} ·</span>
                ))}
                  {/* <span className='post-category'>tutorial</span>
                  <span className='post-category'>godot</span> */}
              </div>
            </div>
        </div>
        <hr />
        {/* <div className='post-description' dangerouslySetInnerHTML={markup} /> */}
    </div>
  )
}
