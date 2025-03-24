import jwt from 'jsonwebtoken'
 const tokengen = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.secretkey
        ,{expiresIn:"7d"},
    )

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true,
        secure: process.env.Nodeenv==="development",
        sameSite: "strict",
    })
    return token
}

export default tokengen;