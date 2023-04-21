import Sidebar from '../../components/sidebar/Sidebar'
import './Settings.css'

export default function Settings() {
  return (
    <div className='settings'>
        <div className="settings-wrapper">
            <div className="settings-title">k
                <div className="settings-profile-picture">
                    <img src='https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg' />
                </div>
            </div>
        </div>
        <Sidebar />
    </div>
  )
}
