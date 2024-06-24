import express from 'express'
import { GetLoginDetails , InsertNewUser} from '../controller/authenticate.js'
const router = express.Router();

router.post('/login', GetLoginDetails)
router.post('/signup', InsertNewUser)

export default router