import { nanoid } from 'nanoid'
import URL from '../models/url.js'

const handleGenerateNewShortID = async (req, res) => {
    const body = req.body;
    if (!body.url) {
        res.status(404).json({ error: 'url is required' });
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId,
        redirectUrl: body.url,
        visitHistory: []
    });
    res.status(201).json({ id: shortId });
}

const handleRedirectToUrl = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl)
}

const getAllURl = async (req, res) => {
    console.log("first")
    const allUrls = await URL.find({})
    res.render('all-urls', { urls: allUrls })
}


export {
    handleGenerateNewShortID,
    handleRedirectToUrl,
    getAllURl
}