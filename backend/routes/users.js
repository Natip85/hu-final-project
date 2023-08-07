var express = require('express');
var router = express.Router();
const users = require('../controllers/users');
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/adminAuth')

router.get('/', users.allUsers);
router.post('/signup', users.signup);
router.post('/login', users.login);
router.put('/profile', auth, users.updateProfileController)

router.get('/user-auth', auth, (req, res)=>{
  res.status(200).send({ok: true})
})

router.get('/admin-auth', auth, isAdmin,(req, res)=>{
  res.status(200).send({ok: true})
})

module.exports = router;
