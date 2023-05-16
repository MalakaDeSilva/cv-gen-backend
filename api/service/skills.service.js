const db = require("../../firebase");

async function getSkillsByUser(email) {
  const snapshot = await db
    .collection("skills")
    .where("user", "==", email)
    .get();

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function createUpdateSkills(skill, doc = "") {
  if (doc == "") {
    const skillRef = db.collection("skills").doc();

    const res = await skillRef.set(skill);

    return res;
  } else {
    const skillRef = db.collection("skills").doc(doc);

    const res = await skillRef.set(skill);

    return res;
  }
}

async function deleteSkillByDoc(docId) {
  let res = await db.collection("skills").doc(docId).delete();

  return res;
}

async function deleteSkillsByUser(email) {
  let snapshot = await db.collection("skills").where("user", "==", email).get();

  // Delete each document returned by the query
  snapshot.forEach((doc) => {
    doc.ref.delete();
  });

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

module.exports = {
  getSkillsByUser,
  createUpdateSkills,
  deleteSkillByDoc,
  deleteSkillsByUser,
};
