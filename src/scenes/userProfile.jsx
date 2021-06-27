import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import {Button, Card, Col, Row} from 'antd'
import image from '../img_avatar.png'
import MyTasks from "../components/myTasks";

const UserProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const history = useHistory()

    useEffect(() => {
        fetch(`https://xchange-api-1909.web.app/users/id/${userInfo.id}`)
            .then((response) => response.json())
            .then((result) => {
                setUserInfo(result.data)
                history.push('/user-profile')
            })
            .catch((err) => console.log('ERROR', err))
    }, [])

  return (
    <Row justify="space-around">
      <Col span={8}>
          <Card>
              <div style={{textAlign: "center"}}>
                  <div>
                  {userInfo?.userImage ? (
                          <img className="user-profile-img" src={userInfo.userImage} />
                  ) : (
                      <img className="user-profile-img" src={image} alt="userImage" />
                  )}
                  </div>

                  <h2>{userInfo?.firstName} {userInfo?.lastName}</h2>
                  <div>{userInfo?.company}</div>
              </div>
              <br/>
              <h3>Tokens</h3>
              <div>{userInfo?.tokens}</div>
              <br/>
              <h3>Skills</h3>
              <div>{userInfo?.mySkills && (userInfo.mySkills).join(', ')}</div>
              <br/>
              <h3>Tools</h3>
              <div>{userInfo?.myTools && (userInfo.myTools).join(', ')}</div>
              <br/>
              <h3>Links</h3>
              <div>{userInfo?.email}</div>
              <div>{userInfo?.website}</div>
              <div>{userInfo?.calendlyLink}</div>
              <br/>
              <h3>Additional Information</h3>
              <div>{userInfo?.additionalInformation}</div>
              <div style={{textAlign: "center"}}>
                  <Button
                      className="button"
                      onClick={() => history.push(`/updateUser/${userInfo.id}`)}
                  >
                      Edit User
                  </Button>
              </div>
          </Card>

      </Col>
        <Col span={14}>
            <MyTasks />
        </Col>
    </Row>
  )
}
export default UserProfile