const {Router} = require('express');
const { findOne } = require('../../model/Question');
const Question = require('../../model/Question')
const router = Router();

router.post(
    '/delete', async (req,res) => {
    try {
        console.log(req.body)
        const {question, id} = req.body
        
        const deleteQuestion = Question.findOne({_id : id})
        
        await deleteQuestion.deleteOne()

        res.status(201).json({ message: "Question deleted"})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: "ERROR ON SERVER"})
    }
})


module.exports = router