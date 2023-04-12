const db = require("../../firebase");

async function getPersonalDetailsByUser(email) {
  const snapshot = await db
    .collection("personal")
    .where("user", "==", email)
    .get();

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function createUpdatePersonalDetails(personalDetail, doc = "") {
  if (doc == "") {
    const personalRef = db.collection("personal").doc();

    const res = await personalRef.set(personalDetail);

    return res;
  } else {
    const personalRef = db.collection("personal").doc(doc);

    const res = await personalRef.set(personalDetail);

    return res;
  }
}

async function deletePersonalDetailsByDoc(docId) {
  let res = await db.collection("personal").doc(docId).delete();

  return res;
}

async function deletePersonalDetailsByUser(email) {
  let snapshot = await db
    .collection("personal")
    .where("user", "==", email)
    .get();

  // Delete each document returned by the query
  snapshot.forEach((doc) => {
    doc.ref.delete();
  });

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

module.exports = {
  getPersonalDetailsByUser,
  createUpdatePersonalDetails,
  deletePersonalDetailsByUser,
  deletePersonalDetailsByDoc,
};
