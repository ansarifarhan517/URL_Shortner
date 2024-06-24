import express from "express";
import {
    handleGenerateNewShortID,
    handleRedirectToUrl,
    getAllURl
} from '../controller/url.js'
const router = express.Router();



router.post('/', handleGenerateNewShortID);
router.get('/:shortId', handleRedirectToUrl);
router.get('/', getAllURl);

export default router;