//Define routes for CRUD functions
const express = require('express');
const router = express.Router();
const { getData, getInfo, createData, updateData, deleteData, setUsers } =  require('../controllers/maincontroller');

router.route('/').get(getData);//get all users
router.route('/random/:usercount').get(setUsers);//create users based on usercountcount
router.route('/:id').get(getInfo);//get user data based on id
router.route('/').post(createData);//create new user    
router.route('/:id').put(updateData);//update user based in id    
router.route('/:id').delete(deleteData);//delete user based on id    

module.exports = router;