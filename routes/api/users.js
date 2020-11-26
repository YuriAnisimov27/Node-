const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const User = require('../../models/User')

// @route     POST api/users
// @desc      Register User
// @access    Public
router.post('/', [
  check('name', 'Name Is Required!')
    .not()
    .isEmpty(),
  check('email', 'Please, Include A Valid E-mail!')
    .isEmail(),
  check('password', 'Please, Enter A Password With 6 Or More Characters')
    .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })
      // See if User Exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User Does Exists' }] })
      }
      
      // Get user Gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      user = new User({
        name,
        email,
        avatar,
        password
      })

      // Encrypt Password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      user.save()

      // Returt jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token })
        })
    } catch (err) {
      console.log(err.message)
      res
        .status(500)
        .send('Server Error')
    }
})

module.exports = router;
