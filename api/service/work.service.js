const db = require("../../firebase");

async function getWorkDetailsByUser(email) {
  const snapshot = await db.collection("work").where("user", "==", email).get();

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function createUpdateWorkDetails(workDetail, doc = "") {
  if (doc == "") {
    const workRef = db.collection("work").doc();

    const res = await workRef.set(workDetail);

    return res;
  } else {
    const workRef = db.collection("work").doc(doc);

    const res = await workRef.set(workDetail);

    return res;
  }
}

async function deleteWorkDetailsByDoc(docId) {
  let res = await db.collection("work").doc(docId).delete();

  return res;
}

async function deleteWorkDetailsByUser(email) {
  let snapshot = await db.collection("work").where("user", "==", email).get();

  // Delete each document returned by the query
  snapshot.forEach((doc) => {
    doc.ref.delete();
  });

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

module.exports = {
  getWorkDetailsByUser,
  createUpdateWorkDetails,
  deleteWorkDetailsByUser,
  deleteWorkDetailsByDoc,
};
