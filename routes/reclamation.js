const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamation');
const userController = require('../controllers/user');
const multer = require('../middleware/multer-config3');
router.post('/', multer,reclamationController.createreclamation);
router.post('/reclamation', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'),reclamationController.getReclamation);
router.get('/', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile') ,reclamationController.getreclamations);
router.get('/:id', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'),reclamationController.getreclamationbyid);
router.put('/:id', userController.allowIfLoggedin, multer ,userController.grantAccess('updateOwn', 'profile'),reclamationController.updatereclamation);
router.put('/modify/:id', userController.allowIfLoggedin,userController.grantAccess('updateOwn', 'profile'),reclamationController.savereclamation);

router.delete('/:id', userController.allowIfLoggedin, userController.grantAccess('updateOwn', 'profile'),reclamationController.deletereclamation);
router.delete('/', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'),reclamationController.deletereclamationss);



module.exports = router;