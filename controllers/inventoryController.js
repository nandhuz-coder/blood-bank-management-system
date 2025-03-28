const userModel = require("../models/userModel");
const request = require("../models/request");
const donated = require("../models/donated");
const mongoose = require("mongoose");


const createRequestController = async (req, res) => {
  try {
    let requestBlood = await request.findOne({ bloodGroup: req.body.bloodGroup, hospitalId: req.body.hospitalId });
    if (requestBlood) {
      requestBlood.units = parseInt(req.body.units) + requestBlood.units;
      await requestBlood.save();
    } else {
      requestBlood = new request({
        bloodGroup: req.body.bloodGroup,
        hospitalId: req.body.hospitalId,
        units: req.body.units,
        status: "pending"
      });
      await requestBlood.save();
    }
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
    const donated1 = await donated.findOne({ user: req.body.userId }, "lastDonatedDate");
    const blood = await userModel.findById(req.body.userId);
    let last = null;
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
    if (donated1) last = donated1.lastDonatedDate;
    return res.status(200).send({
      data: pendingRequests.map(req => ({
        ...req.toObject(),
        intrested: req.intrested,
        last: last,
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
    // Step 1: Fetch donation history without population
    const donationHistory = await donated.find({ user: req.body.userId });

    if (!donationHistory || donationHistory.length === 0) {
      return res.status(200).send({ success: true, data: [] });
    }

    // Step 2: Extract hospital IDs
    const hospitalIds = donationHistory.flatMap((record) =>
      record.donationHistory.map((entry) => entry.hospital)
    );

    // Step 3: Fetch hospital details separately with role filter
    const hospitals = await userModel.find({
      _id: { $in: hospitalIds },
      role: "hospital", // ✅ Ensuring only hospitals are fetched
    }).select("hospitalName address");

    // Step 4: Process and store updated history in sendData
    let sendData = [];

    donationHistory.forEach((record) => {
      record.donationHistory.forEach((entry) => {
        let hospitalData = hospitals.find(
          (h) => h._id.toString() === entry.hospital.toString()
        ) || { hospitalName: "N/A", address: "N/A" };

        sendData.push({
          donatedDate: entry.donatedDate,
          hospitalName: hospitalData.hospitalName,
          address: hospitalData.address,
        });
      });
    });

    return res.status(200).send({
      success: true,
      data: sendData,
    });

  } catch (error) {
    console.error("Error fetching donation history:", error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching donation history",
      error,
    });
  }
};



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

const updateDonorStatus = async (req, res) => {
  try {
    const { donorId, action, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(donorId)) {
      return res.status(400).send({ success: false, message: "Invalid ID format" });
    }

    const requestId = new mongoose.Types.ObjectId(userId);

    // Find request by hospitalId and donorId
    const requestDoc = await request.findOne({ hospitalId: requestId, "donors.id": donorId });

    if (!requestDoc) {
      return res.status(404).send({
        success: false,
        message: "Request not found",
      });
    }

    // Update donor action
    const donorIndex = requestDoc.donors.findIndex(donor => donor.id.toString() === donorId.toString());

    if (donorIndex === -1) {
      return res.status(404).send({
        success: false,
        message: "Donor not found in this request",
      });
    }

    // Set the action for the donor
    requestDoc.donors[donorIndex].action = action;

    if (action === "accepted") {
      requestDoc.units -= 1;

      const donationRecord = await donated.findOne({ user: donorId });

      if (donationRecord) {
        donationRecord.lastDonatedDate = new Date();
        donationRecord.donationHistory.push({
          hospital: requestDoc.hospitalId,
          donatedDate: new Date()
        });
        await donationRecord.save();
      } else {
        const newDonationRecord = new donated({
          user: donorId,
          lastDonatedDate: new Date(),
          donationHistory: [{
            hospital: requestDoc.hospitalId,
            donatedDate: new Date()
          }]
        });
        await newDonationRecord.save();
      }

      if (requestDoc.units === 0) {
        await request.deleteOne({ _id: requestDoc._id });
      }
    }

    // Save the requestDoc safely
    await request.findOneAndUpdate(
      { _id: requestDoc._id, "donors.id": donorId },
      { $set: { "donors.$.action": action, units: requestDoc.units } }
    );

    return res.status(200).send({
      success: true,
      message: "Donor status updated successfully",
    });

  } catch (error) {
    console.error("🔥 Error updating donor status:", error);
    return res.status(500).send({
      success: false,
      message: "Error in updating donor status",
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
  getDonorsListController1,
  updateDonorStatus
};
