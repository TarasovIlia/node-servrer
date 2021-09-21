const {Router} = require('express');
const Topic = require('../../model/Topic')
const router = Router();


router.get('/topic/get', async (res,req) => {
    try {
        const allTopic = await Topic.find({})
        req.json(allTopic)

        res.status(201).json({ message: "Questions send"})

    } catch (err) {
        //res.status(500).json({message: "ERROR ON SERVER"})
    }
})


module.exports = router