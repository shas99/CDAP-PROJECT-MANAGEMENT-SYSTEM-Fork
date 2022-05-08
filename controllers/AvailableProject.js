
const AvailableProject = require('../models/AvailableProject')

//*******VIEW AVAILABLE PROJECTS API *******
exports.viewAvailableProjects =async(req,res,next) => {
try{
    const availableProjects = await AvailableProject.find()
    console.log("Projects",availableProjects)

    res.status(201).json({
        success: true,
        data: res.AvailableProject
    })

}catch(error){
    res.status(500).json({success:false, error:error.message})
}

};

//***** VIEW SPECIFIC PROJECT API******** 
exports.viewspecificproject = async(req,res,next) => {
    
    try{
        const availableprojectid = req.params.id;
        const availableProjects = await AvailableProject.findById(availableprojectid)//group that is approved and have this perticular member
        console.log("Projects",availableProjects)
    
        res.status(201).json({
            success: true,
            data: res.AvailableProject
        })
    
        
    
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}



//******** PLACE BID SPECIFIC AVAILABLE PROJECT *********
exports.placeBidonAvailableProject = async(req,res,next) =>{

    const {bidPlacedGroup, date, time} = req.body
    const relevantProjectID =req.params.id;
    try{

        const placedBid = await AvailableProject.findOne({
           relevantProjectID
        })
        if(!placedBid){
            return next(new ErrorResponse("Project placed to bid not found",400))
        }
       placedBid.bidding.biddingPlacedGroup = req.body.bidPlacedGroup
       placedBid.bidding.date = req.body.date 
       placedBid.bidding.time = req.body.time
        
        await placedBid.save()

        res.status(201).json({
            success: true,
            data: "Bid set Success"
        })

    }catch(error){
        next(error)
    }
};
