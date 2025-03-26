const userModel = require("../models/userModel");
const request = require("../models/request");
const donated = require("../models/donated");


const createRequestController = async (req, res) => {
  try {
    const requestBlood = new request(req.body);
    await requestBlood.save();
    const requestData = await request.find({
      hospitalId: req.body.hospitalId,
      status: "pending",
    });

    return res.status(201).send({
      success: true,
      message: "Request submitted successfully",
      data: requestData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create request API",
      error,
    });
  }
}


const getDonorsListController = async (req, res) => {
  try {
    const requestData = await request.find({
      hospitalId: req.body.userId,
      status: "pending",
    }).lean(); // Convert to plain objects

    // Fetch donor details separately
    for (let req of requestData) {
      const donorIds = req.donors.map(d => d.id);
      const donorDetails = await userModel.find({ _id: { $in: donorIds } }, "name phone bloodGroup").lean();
      req.interestedDonors = req.donors.length;
      req.donors = req.donors.map(donor => {
        const donorInfo = donorDetails.find(d => d._id.toString() === donor.id.toString());
        return {
          id: donor.id,
          name: donorInfo?.name || "Unknown",
          phone: donorInfo?.phone || "Unknown",
          bloodGroup: donorInfo?.bloodGroup || "Unknown",
          action: donor.action
        };
      });
    }
    return res.status(200).send({
      requestData: requestData,
    });
  } catch (error) {
    console.error("🔥 Error in donor API:", error);
    return res.status(500).send({
      success: false,
      message: "Error fetching donor list",
      error,
    });
  }
};



const deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;
    await request.deleteOne({ _id: id })
    return res.json({
      message: "Removed successfully.",
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete request API",
      error,
    });
  }
}

const getuserReq = async (req, res) => {
  try {
    const blood = await userModel.findById(req.body.userId);
    const pendingRequests = await request.find({
      status: "pending",
      bloodGroup: blood.bloodGroup
    }).populate({
      path: 'hospitalId',
      select: 'hospitalName address'
    });
    const userId = req.body.userId;
    pendingRequests.forEach(request => {
      request.intrested = false;
      request.donors.forEach(donor => {
        if (donor?.id.equals(userId)) request.intrested = true;
      });
    });
    return res.status(200).send({
      data: pendingRequests.map(req => ({
        ...req.toObject(),
        intrested: req.intrested
      }))
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching pending requests",
      error,
    });
  }
}


const getIntrested = async (req, res) => {
  try {
    const intrested = await request.findById(req.body.id);
    if (!intrested) {
      return res.status(404).send({
        success: false,
        message: "Request not found",
      });
    }
    intrested.donors.push({
      id: req.body.userId,
      action: "pending",
    });
    await intrested.save();
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registering interest",
      error,
    });
  }
}

const getDonationHistory = async (req, res) => {
  try {
    const donationHistory = await donated.find({ user: req.body.userId }).populate({
      path: 'donationHistory.hospital',
      select: 'hospitalName address'
    });

    if (!donationHistory.length) return res.status(200).send({ data: false });

    return res.status(200).send({
      data: donationHistory,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching donation history",
      error,
    });
  }
}

const getDonorsListController1 = async (req, res) => {
  try {
    const donorData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      donors: donorData,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in donor API",
      error,
    });
  }
};


module.exports = {
  getDonorsListController,
  deleteRequest,
  getuserReq,
  createRequestController,
  getIntrested,
  getDonationHistory,
  getDonorsListController1
};
