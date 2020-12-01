const Router = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/File')

const router = new Router()

router.post('/authorization',
  [
    check('email', 'Incorrect email')
      .isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12')
      .isLength({ min: 3, max: 12 })
  ],
  async(req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Incorrect request', errors })
    }

    const { email, password } = req.body

    const candidate = await User.findOne({email})
    if (candidate) {
      return res.status(400).json({ message: `User with email ${email} already exists` })
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = new User({email, password: hashPassword})
    await user.save()
    await fileService.createDir(new File({user: user._id, name: ''}))
    return res.json({message: 'User was created'})
  } catch (e) {
    console.error(e)
    res.send({ message: 'Server Error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { id: user.id },
      config.get('secretKey'),
      { expiresIn: "1h" }
      )
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar
      }
    })
  } catch (e) {
    console.error(e)
    res.send({ message: 'Server Error' })
  }
})

router.get('/auth', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user.id})
    const token = jwt.sign(
      { id: user.id },
      config.get('secretKey'),
      { expiresIn: "1h" }
    )
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar
      }
    })
  } catch (e) {
    console.error(e)
    res.send({ message: 'Server Error' })
  }
})

module.exports = router;
