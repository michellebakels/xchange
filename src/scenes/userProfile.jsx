import React, {useContext} from 'react'
import {UserContext} from "../App";
import {useHistory} from "react-router-dom";
import {Button} from "antd";

const UserProfile = () => {

    const {userInfo} = useContext(UserContext)
    const history = useHistory()

    return(
        <>
            <div>{userInfo?.userImage}</div>
            <div>{userInfo?.firstName} {userInfo?.lastName}</div>
            <div>{userInfo?.email}</div>
            <div>{userInfo?.company}</div>
            {/* <div>{userInfo && (userInfo?.mySkills).join(', ')}</div> */}
            <div>{userInfo?.website}</div>
            <div>{userInfo?.calendlyLink}</div>
            <div>{userInfo?.additionalInformation}</div>
            <Button onClick={() => history.push(`/updateUser/${userInfo.id}`)}>Edit User</Button>
        </>
    )
}

export default UserProfile