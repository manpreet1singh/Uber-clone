const express=require('express')
const router=express.Router()
const captainController=require('../controllers/captain.controller')
const {body}=require('express-validator')
const authMiddleware=require('../middleware/auth.middleware')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
],captainController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters')
],captainController.loginCaptain)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)



module.exports=router;