const puppeteer = require("puppeteer");
const workService = require("../service/work.service");
const personalDetService = require("../service/personal.info.service");
const skillsService = require("../service/skills.service");
const eduService = require("../service/edu.service");
const chromium = require("chrome-aws-lambda");

async function getData(userId) {
  let workInfo = await workService.getWorkDetailsByUser(userId);
  let personalInfo = await personalDetService.getPersonalDetailsByUser(userId);
  let skillsInfo = await skillsService.getSkillsByUser(userId);
  let eduInfo = await eduService.getEduDetailsByUser(userId);

  return {
    work: workInfo,
    personal: personalInfo[0],
    skills: skillsInfo,
    education: eduInfo,
  };
}

async function generatePDF(req, id) {
  const host = `${req.protocol}://${req.hostname}:${8000}`;

  /* const browser = await puppeteer.launch({
    headless: "new",
  }); */

  const browser = await chromium.puppeteer.launch({ headless: "new" });
  
  const page = await browser.newPage();
  await page.goto(`${host}/pdf/get/${id}`, {
    waitUntil: "domcontentloaded",
  });
  const pdf = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();
  return pdf;
}

module.exports = {
  generatePDF,
  getData,
};
