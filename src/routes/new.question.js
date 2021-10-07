const {Router} = require('express');
const Question = require('../../model/Question')
const router = Router();

router.post(
    '/send', async (req,res) => {
    try {
        const {question, topic} = req.body
        
        if(!question) {
            return res.status(500).json({message: "pleace, enter the questions"})
        }
        
        if(!topic) {
            return res.status(500).json({message: "pleace, enter the topic"})
        }

        const sendNewMessage = new Question({ question: question,  topic: topic, resolved: false })
        
        await sendNewMessage.save()

        res.status(201).json({ message: "Question send"})

    } catch (err) {
        res.status(500).json({message: "server error, pleace, try later"})
    }
})


module.exports = router