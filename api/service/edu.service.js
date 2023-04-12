const db = require("../../firebase");

async function getEduDetailsByUser(email) {
  const snapshot = await db
    .collection("education")
    .where("user", "==", email)
    .get();

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function createUpdateEduDetails(eduDetail) {
  const eduRef = db.collection("education").doc();

  const res = await eduRef.set(eduDetail);

  return res;
}

async function deleteEduDetailsByDoc(docId) {
  let res = await db.collection("education").doc(docId).delete();

  return res;
}

async function deleteEduDetailsByUser(email) {
  let snapshot = await db
    .collection("education")
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
  getEduDetailsByUser,
  createUpdateEduDetails,
  deleteEduDetailsByUser,
  deleteEduDetailsByDoc,
};
