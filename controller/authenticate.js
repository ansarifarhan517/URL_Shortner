import user from "../models/user.js"

const GetLoginDetails = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return  res.status(400).json({error: 'Missing Username Or Password'})
    }
    const result = await user.find({username, password})
    if (result.length) {
        return  res.redirect('/')
        // res.status(200).json(result.username)
    }
    else {
        return  res.status(404).json({error: 'Invalid Credentials'})
    }
}


const InsertNewUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
       return res.status(400).json({error: 'Missing Username Or Password'})
    }
 
    const isExistingUser = await user.find({username, password}) 
    if (isExistingUser) {
        return res.redirect('/login')
    }

    const result = await user.create({username, password})
    if (Object.keys(result).length) {
        return res.redirect('/login')
    }
    else {
        return res.status(404).json({error: 'Invalid Credentials'})
    }
 
}


export {
    GetLoginDetails,
    InsertNewUser
}