import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import '../styles/userProfile.css'


const UserProfile = () => {
  const { userInfo } = useContext(UserContext)
  const history = useHistory()

  return (
    <>
    <main>
      <section id="userProfileHeader">
        <div id="userProfileImage">
          <div><img alt="userImage"/>{userInfo.userImage}</div>
          <Button onClick={() => history.push(`/updateUser/${userInfo.id}`)}>
            Edit User
          </Button>
        </div>

        <div>
          {userInfo.firstName} {userInfo.lastName}
        </div>
        <div>{userInfo.company}</div>
      </section>

      <section id="userProfileHero">
      <p>Check out my skills</p>
        <div id="userProfileSkills">
          {/* <div>{(userInfo.mySkills).join(', ')}</div> */}
        </div>
        <div id="userProfileLinks">
        <p>Links</p>
          <div><img alt="email"/>{userInfo.email}</div>
          <div><img alt="website"/>{userInfo.website}</div>
          <div><img alt="calendlyLink"/>{userInfo.calendlyLink}</div>
        </div>
      </section>

      <section id="userProfileFooter">
          <p>Additional Information</p>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quibusdam modi, quas accusantium temporibus sapiente aliquam nemo perferendis eligendi iure praesentium, tenetur dignissimos. Nulla veniam a aut illo, corporis dolorem?</div>
        {/* <div>{userInfo.additionalInformation}</div> */}
      </section>
      </main>
    </>
  )
}

export default UserProfile
