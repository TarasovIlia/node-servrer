const {Router} = require('express');
const Question = require('../../model/Question')
const router = Router();


router.get('/', async (res,req) => {
    try {
        const allQuestion = await Question.find({})
        req.json(allQuestion)

        res.status(201).json({ message: "Questions send"})

    } catch (err) {
        //res.status(500).json({message: "ERROR ON SERVER"})
    }
})


module.exports = router