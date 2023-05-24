const { Timestamp } = require("firebase-admin/firestore");
const db = require("../../firebase");

async function getGeneratedPDFs() {
  try {
    const doc = await db.collection("analytics").doc("generated_pdfs").get();

    if (doc.exists) {
      return doc;
    } else {
      console.log("No doc found");
    }
  } catch (e) {
    console.log(e.message);
  }

  return null;
}

function addGeneratedPDF() {
  getGeneratedPDFs()
    .then((doc) => {
      const docRef = db.collection("analytics").doc("generated_pdfs");

      docRef.set({
        ...doc.data(),
        count: ++doc.data().count,
        last_generated: Timestamp.fromDate(new Date()),
      });
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  addGeneratedPDF,
  getGeneratedPDFs,
};
