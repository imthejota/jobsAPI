const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require('http-status-codes')



const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    console.log("🚀 ~ file: auth.js:8 ~ register ~ user:", user)
    const token = await user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name  }, token});
}

const allUsers = async (req, res) => {
    const allUsers = await User.find()
    console.log("🚀 ~ file: auth.js:15 ~ allUsers ~ allUsers:", allUsers)   
    res.status(StatusCodes.OK).json({allUsers})
}

const login = async (req, res) => {
    const {mail, password} = req.body
    
    if (!mail || !password) {
        throw new BadRequestError('Please provide mail & password')
    }
    
    const user = await User.findOne({mail})
    console.log("🚀 ~ file: auth.js:27 ~ login ~ user:", user)
    if (!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

}

module.exports = { register, login, allUsers }