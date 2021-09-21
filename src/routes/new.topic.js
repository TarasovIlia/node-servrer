const {Router} = require('express');
const Topic = require('../../model/Topic')
const router = Router();

router.post(
    '/topic', async (req,res) => {
    try {
        console.log(req.body)
        const {topic, level} = req.body
        
        const sendNewTopic = new Topic({ topic: topic, level: level })
        
        await sendNewTopic.save()

        res.status(201).json({ message: "Question send"})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: "ERROR ON SERVER"})
    }
})


module.exports = router