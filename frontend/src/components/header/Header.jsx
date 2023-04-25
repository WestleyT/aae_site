import './Header.css'

export default function Header({ headerText }) {
  return (
    <div className='header'>
        <div className="header-titles">
            <span className='header-title-lrg'>{headerText}</span>
        </div>
    </div>
  )
}
