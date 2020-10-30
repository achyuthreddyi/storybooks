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

// @desc show all the public stories
// @route GET /stories/index 
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public'})
                        .populate('user')
                        .sort({ createdAt: 'desc'})
                        .lean()
        res.render('stories/index',{
            stories
        })
        
    } catch (error) {
        console.log(error);
        res.render('errors/500')          
    }
  })

module.exports = router