const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const { register,viewfeedback,viewmarks, login,forgotpassword,resetpassword,groupregister,suggestsupervisor,group,topicregister} = require('../controllers/auth')

router.route("/register").post(register)

router.route("/login").post(login)

router.route("/forgotpassword").post(forgotpassword)

router.route("/resetpassword/:resetToken").put(resetpassword)

router.route("/groupregister").post(groupregister)//Group reg route

router.route("/suggestsupervisor").get(suggestsupervisor)//suggested supervisor

router.route("/viewfeedback").get(viewfeedback)//to view feedback

router.route("/viewmarks").get(viewmarks)//to view marks

router.route("/group").get(group)//to view marks

router.route("/topicregister").post(topicregister)//to register using the topic assessment form

// router.route("/groupregister").get(groupregister)//Group registration
module.exports = router