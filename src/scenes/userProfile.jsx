import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import '../styles/userProfile.css'
import image from '../img_avatar.png'

const UserProfile = () => {
  const { userInfo } = useContext(UserContext)
  const history = useHistory()
  return (
    <>
      <main>
        <section id="userProfileHeader" className="userProfileHeaderGid">
          <section id="imageBox" className="imageBox">
            <div className="userImgField">
              {!userInfo.userImage ? (
                <img className="img" src={image} alt="userImage" />
              ) : (
                <div>{userInfo.userImage}</div>
              )}
              <Button
                className="button"
                onClick={() => history.push(`/updateUser/${userInfo.id}`)}
              >
                Edit User
              </Button>
            </div>
          </section>
          <section id="userInfoBox" className="userInfoBox">
            <div>
              {' '}
              <p className="userName">
                {' '}
                {userInfo?.firstName} {userInfo?.lastName}
              </p>
            </div>
            <div className="userCompany">{userInfo?.company}</div>
            <section />
          </section>
        </section>
        <section id="userProfileHero" className="userProfileHeroGrid">
          <div className="skills">
            <p>Check out my skills</p>
            <div id="userProfileSkills">
              {/* <div>{(userInfo.mySkills).join(', ')}</div> */}
            </div>
          </div>
          <div id="userProfileLinks" className="links">
            <p>Links</p>
            <div>{userInfo?.email}</div>
            <div>{userInfo?.website}</div>
            <div>{userInfo?.calendlyLink}</div>
          </div>
        </section>
        <section id="userProfileFooter" className="userProfileFooterGrid">
          <p>Additional Information</p>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            quibusdam modi, quas accusantium temporibus sapiente aliquam nemo
            perferendis eligendi iure praesentium, tenetur dignissimos. Nulla
            veniam a aut illo, corporis dolorem?
          </div>
          {/* <div>{userInfo.additionalInformation}</div> */}
        </section>
      </main>
    </>
  )
}
export default UserProfile
