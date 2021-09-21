const {Router} = require('express');
const Question = require('../../model/Question')
const router = Router();

router.post(
    '/send', async (req,res) => {
    try {
        console.log(req.body)
        const {question, topic} = req.body
        
        const sendNewMessage = new Question({ question: question,  topic: topic, resolved: false })
        
        await sendNewMessage.save()

        res.status(201).json({ message: "Question send"})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: "ERROR ON SERVER"})
    }
})


module.exports = router