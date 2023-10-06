const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const compconfController = require('../controllers/files-treatment');
router.post('/createcompconf', compconfController.createcompconf);
router.get('/allcompconf', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'), compconfController.getcompconf);
router.get('/compconf/:id', compconfController.getcompconfbyid);
router.put('/compconf/:id', userController.allowIfLoggedin,userController.grantAccess('updateOwn', 'profile'), compconfController.updatecompconf);
router.delete('/compconf/:id', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), compconfController.deletecompconfbyid);
router.delete('/allcompconf', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'),compconfController.deletecompconfs);


router.post('/createworkgab', compconfController.createWorkgab);
router.get('/allworkgab', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), compconfController.getWorkgab);
router.get('/workgab/:id', compconfController.getWorkgabbyid);
router.put('/workgab/:id', userController.allowIfLoggedin,userController.grantAccess('updateOwn', 'profile'), compconfController.updateWorkgab);
router.delete('/workgab/:id', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), compconfController.deleteWorkgabbyid);
router.delete('/allworkgab', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'),compconfController.deleteWorkgabs);

router.post('/createworkpos', compconfController.createWorkpos);
router.get('/allworkpos', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), compconfController.getWorkpos);
router.get('/workpos/:id', compconfController.getWorkposbyid);
router.put('/workpos/:id', userController.allowIfLoggedin,userController.grantAccess('updateOwn', 'profile'), compconfController.updateWorkpos);
router.delete('/workpos/:id', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), compconfController.deleteWorkposbyid);
router.delete('/allworkpos', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'),compconfController.deleteWorkposs);


router.post('/createWorksms', compconfController.createWorksms);
router.get('/allworksms', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), compconfController.getWorksms);
router.get('/worksms/:id', compconfController.getWorksmsbyid);
router.put('/worksms/:id', userController.allowIfLoggedin,userController.grantAccess('updateOwn', 'profile'), compconfController.updateWorksms);
router.delete('/worksms/:id', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), compconfController.deleteWorksmsbyid);
router.delete('/allworksms', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'),compconfController.deleteWorksmss);
module.exports = router;