import firebase from "firebase";

export const apiCallCreateUser = (email, firstName, lastName) => {
    const user = {
        'email': email,
        'firstName': firstName,
        'lastName': lastName,
    }

    fetch('https://xchange-api-1909.web.app/users', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .catch(err => console.log('ERROR', err))
}

export const getUserInfo = (email, setUserInfo) => {
    fetch (`https://xchange-api-1909.web.app/users/${email}`)
        .then((res) => res.json())
        .then((data) => {
            setUserInfo(data);
          })
          .catch(err => console.log('ERROR', err))
}

export const handleLogin = (e, email, password, history, setErrors, setUserInfo) => {
    e.preventDefault()

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                getUserInfo(email, setUserInfo)
            } )
            .then(json => {
                history.push('/')
            })
            .catch(e => setErrors(e.message))
        })
}

export const handleSignUp = (e, email, password, firstName, lastName, history, setErrors) => {
    e.preventDefault()

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    apiCallCreateUser(email, firstName, lastName)
                })
                .then(res => {
                    history.push('/')
                })
                .catch(e => setErrors(e.message))
        })
}

export const logOut = (e) => {
    e.preventDefault()
    firebase.auth()
        .signOut()
        .catch(error => console.log('error in log out', error))
}

export const resetPassword = (email, setErrors) => {
    firebase.auth().sendPasswordResetEmail(email).catch(error => {
        setErrors(error.message)
    })
}
export const updateUser = (e, email, password, firstName, lastName, history, setErrors) => {
    
    fetch('https://xchange-api-1909.web.app/users', {
        method: "PATCH",
        body: JSON.stringify(),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((result) => result.json())
    .then(res => {
        history.push('/')
    })
    .catch(e => setErrors(e.message))
}