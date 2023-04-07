const EduDetails = require("../model/edu.details");

function getEduDetailsByUserId(userId) {
  let query = {
    userId,
    isDeleted: false,
  };

  return EduDetails.findOne(query)
    .exec()
    .then((doc) => {
      if (doc) {
        return doc;
      } else {
        return { message: "No valid entry found for the provided ID." };
      }
    })
    .catch((err) => {
      return { error: err };
    });
}

function createUpdateEduDetails(eduDetail, userId) {
  var query = { userId },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  return EduDetails.findOneAndUpdate(query, eduDetail, options)
    .then((doc) => {
      if (doc) {
        return { updatedData: doc };
      } else {
        eduDetail.set({
          _id: new mongoose.Types.ObjectId(),
        });

        return EduDetails.save()
          .then((result) => {
            return { createdData: result };
          })
          .catch((err) => {
            return { error: err };
          });
      }
    })
    .catch((err) => {
      return { error: err };
    });
}

function deleteEduDetailsByUser(userId) {
  let query = {
    userId,
  };

  return EduDetails.findOneAndDelete(query, {
    new: true,
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return { error: err };
    });
}

module.exports = {
  getEduDetailsByUserId,
  createUpdateEduDetails,
  deleteEduDetailsByUser,
};
