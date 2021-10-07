const {Router} = require('express');
const Topic = require('../../model/Topic')
const router = Router();

router.post(
    '/topic', async (req,res) => {
    try {
        console.log(req.body)
        const {topic, level} = req.body
        
        if(!topic) {
            return res.status(500).json({message: "pleace, enter the topic"})
        }

        const sendNewTopic = new Topic({ topic: topic, level: level })

        await sendNewTopic.save()

        res.status(201).json({ message: "Topic send"})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: "server error, pleace, try later"})
    }
})


module.exports = router