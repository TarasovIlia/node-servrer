const {Router} = require('express');
const Question = require('../../model/Question')
const router = Router();

router.get('/page', async (req,res) => {
    try {
        const newLimit = parseInt(req.query.limit);
        const newTopic = req.query.topic;
        const limit = 11 * (newLimit || 1)
        const allQuestion = await Question
            .find(newTopic ? {topic:newTopic} : {})
            .limit(limit)
        res.json(allQuestion)
        res.status(201).json({ message: "Questions send"})

    } catch (err) {
        //res.status(500).json({message: "ERROR ON SERVER"})
    }
})


module.exports = router