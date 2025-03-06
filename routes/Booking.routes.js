const { createBooking, getBookings, getBookingById } = require('../controller/Booking.Controller');
const {verifyToken}=require('../middleware/AuthMiddleware')
const router = require('express').Router();

router.post('/createBook',verifyToken ,createBooking );
router.get('/get',  getBookings );
router.get('/get/:id', getBookingById);
// router.put('/update/:id',updateChef) ;
// router.delete('/delete/:id', deleteCheftById)
// router.delete('/delete', DeleteAllChef)
module.exports = router;
