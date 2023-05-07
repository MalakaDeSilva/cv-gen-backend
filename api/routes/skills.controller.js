const express = require("express");

const router = express.Router();

const skillssService = require("../service/skills.service");

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: API for managing skills
 */

/**
 * @swagger
 * /skill-details/by-user/{userId}:
 *   get:
 *     summary: Returns a list of skills for a selected user
 *     description: Returns a list ofskills for a selected user
 *     tags: [Skills]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Email id of the user to retrieve skills
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: Skills are retrieved successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.get("/by-user/:email", async (req, res, next) => {
  const email = req.params.email;
  let result = await skillssService.getSkillsByUser(email);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /skill-details/:
 *   post:
 *     summary: Create a new skill object for a given user
 *     description: Creates a new skill object for a given user
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The email address of the user
 *               skill:
 *                 type: string
 *                 description: The skill
 *     responses:
 *       '201':
 *         description: The details were added successfully.
 *       '400':
 *         description: The request was malformed or invalid
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.post("/", async (req, res, next) => {
  let skill = {
    user: req.body.user,
    company: req.body.skill,
  };

  let result = await skillssService.createUpdateSkills(skill);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /skill-details/:
 *   put:
 *     summary: Updates/creates a skill object for a given user
 *     description: Updates/creates a skill object for a given user
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The email address of the user
 *               skill:
 *                 type: string
 *                 description: The skill
 *               docId:
 *                 type: string
 *                 description: Id of the document
 *     responses:
 *       '201':
 *         description: The details were added successfully.
 *       '400':
 *         description: The request was malformed or invalid
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.put("/", async (req, res, next) => {
  let skill = {
    user: req.body.user,
    skill: req.body.skill,
  };

  let docId = req.body.docId;

  let result = await skillssService.createUpdateSkills(skill, docId);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /skill-details/by-doc/{docId}:
 *   delete:
 *     summary: Deletes a skill for a selected user
 *     description: Deletes a skill for a selected user
 *     tags: [Skills]
 *     parameters:
 *       - name: docId
 *         in: path
 *         required: true
 *         description: Id of the skill document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Skill is deleted successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.delete("/by-doc/:docId", async (req, res, next) => {
  const docId = req.params.docId;

  let result = await skillssService.deleteSkillByDoc(docId);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /skill-details/by-user/{userId}:
 *   delete:
 *     summary: Deletes a skill for a selected user
 *     description: Deletes a skill for a selected user
 *     tags: [Skills]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Email of the skill document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Skill is deleted successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.delete("/by-user/:email", async (req, res, next) => {
  const email = req.params.email;

  let result = await skillssService.deleteSkillsByUser(email);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
