const User = require('../models/userModel')

exports.register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email)
      return res.status(403).json({
        status: 'failure',
        data: {
          message: 'Please send the required (name, password, email) details to register'
        }
      })

    const user = await User.create({
      name,
      password,
      email,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failure',
      data: {
        message: 'Unable to register user.'
      }
    })
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email || !password)
      return res.status(403).json({
        status: 'failure',
        data: {
          message: 'Please send the required (name, password, email) details to login'
        }
      })

    let user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(403).json({
      status: 'failure',
      data: {
        message: 'User does not exists'
      }
    })

    if (!(await user.correctPassword(password, user.password))) return res.status(403).json({
      status: 'failure',
      data: {
        message: 'email or password do not match'
      }
    })

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failure',
      data: {
        message: 'Unable to login user.'
      }
    })
  }
};