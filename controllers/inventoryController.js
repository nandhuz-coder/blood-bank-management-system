const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: ` Sorry! Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    }
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error,
    });
  }
};

//get all blood records

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.body.userId })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get inventory",
      error,
    });
  }
};

// get blood record of 3

const getRecentBloodRecord=async(req,res)=>{
  try {
    const inventory = await inventoryModel
    .find({ organisation: req.body.userId })
    .limit(3)
    .sort({ createdAt: -1 });
  return res.status(200).send({
    success: true,
    message: "get all records successfully",
    inventory,
  });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"Error in recent API",
      error
    })
  }
}

//get hospital blood records

const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
    .find(req.body.filters)
    .populate("donor")
    .populate("hospital")
    .populate("organisation")
    .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get consumer inventory",
      error,
    });
  }
};

//Get donor records
const getDonarsController=async(req,res) =>{
    try {
        const organisation=req.body.userId;
       const donorId= await inventoryModel.distinct("donor",{
        organisation,
       }); 

       const donors=await userModel.find({_id:{$in:donorId}});
       return res.status(200).send({
        success:true,
        message:"Donors fetched Successfully",
        donors,
       });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
        success:false,
        message : "Error in donor records",
        error
        });
    }
};

// get hospital records
const getHospitalController =async(req,res)=>{
    try {
        const organisation=req.body.userId;

        //get hospital id
        const hospitalId=await inventoryModel.distinct("hospital",{
            organisation,
        });
        //find hospitalId
        const hospitals=await userModel.find({_id:{$in:hospitalId}});
        return res.status(200).send({
         success:true,
         message:"Hospital Data fetched Successfully",
         hospitals,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message : "Error in hospital records",
            error
            });
        
    }
}

//GET ORG records

const getOrganisationController=async(req,res)=>{
try {
    const donor=req.body.userId;

    //get hospital id
    const orgId=await inventoryModel.distinct("organisation",{
        donor,
    });
    //find hospitalId
    const organisations=await userModel.find({_id:{$in:orgId}});
    return res.status(200).send({
     success:true,
     message:"ORG Data fetched Successfully",
     organisations,
    });
} catch (error) {
    console.log(error);
        return res.status(500).send({
            success:false,
            message : "Error in organisation records",
            error
            });
}
}


//GET ORG for hospitalrecords

const getOrganisationForHospitalController=async(req,res)=>{
  try {
      const hospital=req.body.userId;
  
      //get hospital id
      const orgId=await inventoryModel.distinct("organisation",{
          hospital,
      });
      //find hospitalId
      const organisations=await userModel.find({_id:{$in:orgId}});
      return res.status(200).send({
       success:true,
       message:" Hospital ORG Data fetched Successfully",
       organisations,
      });
  } catch (error) {
      console.log(error);
          return res.status(500).send({
              success:false,
              message : "Error in Hospital ORG records",
              error
              });
  }
  };

  

module.exports = { createInventoryController, getInventoryController,getDonarsController,
  getHospitalController,getOrganisationController,getOrganisationForHospitalController,getInventoryHospitalController,getRecentBloodRecord };
