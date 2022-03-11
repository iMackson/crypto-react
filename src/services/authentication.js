
const login = () => {
    // Send info t api - username, password
    // receive response - token

    const token = '123'
    console.log("Logging in...")
    const user = {
        email: 'test@email.com',
        token: token,
        userId: 1
    }
    // store token in local storage
    localStorage.setItem('user', JSON.stringify(user))
    return user
}

const logout = () => {
    localStorage.removeItem('user')
}

const isLoggedIn = () => {
    const user = localStorage.getItem('user')
    return user !== null
}

const getUser = () => {
    return localStorage.getItem('user')
}
const authService = {
    login,
    logout,
    isLoggedIn,
    getUser,
}

export default authService