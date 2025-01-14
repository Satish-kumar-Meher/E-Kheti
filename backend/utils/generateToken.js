import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  })

  res.cookie("jwt", token, {
    httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
  })
}

export default generateToken