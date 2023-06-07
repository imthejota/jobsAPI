const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors/index')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    
    // Replaced by middleware
    /* const {name, mail, password} = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const tempUser = {name, mail, password: hashedPassword} */
    
    // Replaced by mongoose's validation in the model
    /* const {name, mail, password} = req.body
    if (!name || !mail || !password) {
        throw new BadRequestError('Please provide name, mail & password')
    } */
    const user = await User.create({ ...req.body });
    const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
      expiresIn: "30d",
    });
    
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    res.send('login user')
}

module.exports = { register, login }