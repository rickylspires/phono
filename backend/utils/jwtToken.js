//Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {

    // Create JWT token
    const token = user.getJwtToken();

    // options for the cookie
    // Expires after 24 hours * 60mins * 60seconds * 1000ms
    const options = {
        expires: new Date(
            Date.now() + process.env.cookie_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })

}

module.exports = sendToken;