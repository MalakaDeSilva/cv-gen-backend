const express = require("express");
const path = require("path");
const fs = require("fs");
const { addGeneratedPDF } = require("../service/analytics.service");

const pdfService = require("../service/pdf.service");

const router = express.Router();

router.get("/get/:userId", async (req, res) => {
  addGeneratedPDF();
  let userId = req.params.userId;

  let file = fs.readFileSync(
    path.resolve(__dirname, "../../assets/template.html"),
    "utf8"
  );

  // TODO: Fill the html template
  let { work, skills, education, personal } = await pdfService.getData(userId);

  file = file.replace("$name", `${personal.firstName} ${personal.lastName}`);
  file = file.replace("$name", `${personal.firstName} ${personal.lastName}`);
  file = file.replace("$designation", "Engineer");
  file = file.replace("$phone", personal.phone);
  file = file.replace("$phone", personal.phone);
  file = file.replace("$mail", personal.user);
  file = file.replace("$mail", personal.user);
  file = file.replace("$location", "Sri Lanka");
  file = file.replace("$gender", personal.gender);
  file = file.replace("$dob", personal.dob);
  file = file.replace("$maritalStatus", personal.marital_status);
  file = file.replace("$address", personal.address);
  file = file.replace("$nic", personal.nic);
  file = file.replace("$nationality", personal.nationality);
  file = file.replace("$aboutme", personal.description);

  let skillsList = "";

  skills.forEach((skill) => (skillsList += `<li>${skill.skill}</li>`));

  file = file.replace("$skill", skillsList);

  let educationList = "";

  education.forEach((edu) => {
    let educationDet = `<li><div>
        <table>
        <tr>
            <td><b>${edu.institute}</b> - (${edu.period})</td>
            <td></td>
        </tr>
        <tr>
            <td>Graduated: <b>${edu.graduated ? "Yes" : "No"}</b></td>
            <td></td>
        </tr>
        <tr>
            <td>
            ${edu.remarks}
            </td>
        </tr>
        </table>
    </div></li>`;

    educationList += educationDet;
  });

  file = file.replace("$edu", educationList);

  let careerList = "";

  work.forEach((career) => {
    let careerDet = `<li>
        <div>
        <table>
            <tr>
            <td><b>${career.company}</b> - (${career.period})</td>
            <td></td>
            </tr>
            <tr>
            <td>
                ${career.remarks}
            </td>
            </tr>
        </table>
        </div>
    </li>`;

    careerList += careerDet;
  });

  file = file.replace("$work", careerList);

  res.set("Content-Type", "text/html; charset=UTF-8");
  res.status(200).send(file);
});

router.get("/generate/:userId/:time", async (req, res) => {
  let file = await pdfService.generatePDF(req, req.params.userId);

  res.set({ "Content-Type": "application/pdf", "Content-Length": file.length });
  res.status(200).send(file);
});

module.exports = router;
