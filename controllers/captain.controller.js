const captainModel = require('../models/captain.model');
const {validationResult} = require('express-validator');
const captainService = require('../services/captain.service');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array()); // Debugging
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body)
    const {fullname, email, password,vehicle} = req.body;
    const iscaptainAlreadyRegistered = await captainModel.findOne
    ({email});
    if (iscaptainAlreadyRegistered) {
        return res.status(400).json({message: 'Captain already registered'})
    }
    const hashedPassword = await captainModel.hashPassword(password);
    //console.log(hashedPassword)
    console.log(fullname.firstname)
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    }); 
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain})
}




