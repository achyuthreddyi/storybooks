const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

// @desc show add page
// @route GET /stories/add 
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
  })

// @desc process the add form 
// @route GET /stories/add 
router.post('/add', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id 
        console.log('coming her');     
        await  Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.render('errors/500')        
    }
  })


module.exports = router