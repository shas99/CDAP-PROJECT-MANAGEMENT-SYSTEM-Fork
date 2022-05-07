// const User = require('../models/User')
const AvailableProject = require('../models/AvailableProject')
// const topicReg = require('../models/AvailableProject')


//To view Available Projects
exports.viewAvailableProjects =async(req,res,next) => {

// console.log("Hello Project!")


try{

    const availableProjects = await AvailableProject.find()//group that is approved and have this perticular member
    console.log("Projects",availableProjects)// 

    res.status(201).json({
        success: true,
        data: res.AvailableProject
    })

    

}catch(error){
    res.status(500).json({success:false, error:error.message})
}

};