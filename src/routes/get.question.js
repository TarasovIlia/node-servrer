const {Router} = require('express');
const Question = require('../../model/Question')
const router = Router();

router.get('/', async (req,res) => {
    try {
        console.log(req.query.topic)
        const newTopic = req.query.topic;
        const allQuestion = await Question
            .find(newTopic ? {topic:newTopic} : {})
        res.json(allQuestion)
        res.status(201).json({ message: "Questions send"})

    } catch (err) {
        //res.status(500).json({message: "ERROR ON SERVER"})
    }
})


module.exports = router