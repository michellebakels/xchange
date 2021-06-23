import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import {Button, Card, Col, Row} from 'antd'
import image from '../img_avatar.png'
import MyTasks from "../components/myTasks";

const UserProfile = () => {
  const { userInfo } = useContext(UserContext)
  const history = useHistory()

    console.log({userInfo})

  return (
    <Row justify="space-around">
      <Col span={8}>
          <Card>
              <div style={{textAlign: "center"}}>
                  <div>
                  {userInfo?.userImage ? (
                          <div>{userInfo.userImage}</div>
                  ) : (
                      <img className="user-profile-img" src={image} alt="userImage" />
                  )}
                  </div>

                  <h2>{userInfo?.firstName} {userInfo?.lastName}</h2>
                  <div>{userInfo?.company}</div>
              </div>
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