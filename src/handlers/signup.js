/* eslint-disable node/no-unsupported-features/es-syntax */
import User from '../model/user'
import bcryptjs from 'bcryptjs'

const getSignUp = (req, res) => {
    res.render('signup')
}

const postSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let existingEmail = await User.findOne({ email })

        if (existingEmail) {
            throw new Error('this user exist')
        }

        const hashedPassword = await bcryptjs.hash(password, 12)

        const newUser = new User({email, name, password : hashedPassword})

        let savedUser = await newUser.save()

        if(savedUser){
            req.logIn(savedUser, err => {
                return  res.redirect('/')
            })
        }

       
    } catch (error) {
        console.log(error)
    }
}

export { getSignUp, postSignUp }