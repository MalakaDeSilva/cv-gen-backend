const express = require("express");

const router = express.Router();

const personalDetailsService = require("../service/personal.info.service");

/**
 * @swagger
 * tags:
 *   name: Personal
 *   description: API for managing personal details
 */

/**
 * @swagger
 * /personal-details/by-user/{userId}:
 *   get:
 *     summary: Returns a list of personal details for a selected user
 *     description: Returns a list of personal details for a selected user
 *     tags: [Personal]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Email id of the user to retrieve personal details
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: Personal details are retrieved successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.get("/by-user/:email", async (req, res, next) => {
  const email = req.params.email;
  let result = await personalDetailsService.getPersonalDetailsByUser(email);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /personal-details/:
 *   post:
 *     summary: Create a new personal details object for a given user
 *     description: Creates a new personal details object for a given user
 *     tags: [Personal]
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
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *               dob:
 *                 type: string
 *                 description: The date of birth of the user
 *               address:
 *                 type: string
 *                 description: Address of the user
 *               phone:
 *                 type: string
 *                 description: Phone number of the user
 *               nic:
 *                 type: string
 *                 description: National Identity Card number of the user
 *               gender:
 *                 type: string
 *                 description: Gender of the user
 *               nationality:
 *                 type: string
 *                 description: Nationality of the user
 *               maritalStatus:
 *                 type: string
 *                 description: Marital status of the user
 *               aboutme:
 *                 type: string
 *                 description: Small introduction to yourself
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
  let personalDetails = {
    user: req.body.user,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    profession: req.body.profession,
    address: req.body.address,
    phone: req.body.phone,
    nic: req.body.nic,
    gender: req.body.gender,
    nationality: req.body.nationality,
    marital_status: req.body.maritalStatus,
    description: req.body.aboutme,
  };

  let result = await personalDetailsService.createUpdatePersonalDetails(
    personalDetails
  );

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /personal-details/:
 *   put:
 *     summary: Updates a new personal details object for a given user
 *     description: Updates a new personal details object for a given user
 *     tags: [Personal]
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
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *               dob:
 *                 type: string
 *                 description: The date of birth of the user
 *               address:
 *                 type: string
 *                 description: Address of the user
 *               phone:
 *                 type: string
 *                 description: Phone number of the user
 *               nic:
 *                 type: string
 *                 description: National Identity Card number of the user
 *               gender:
 *                 type: string
 *                 description: Gender of the user
 *               nationality:
 *                 type: string
 *                 description: Nationality of the user
 *               maritalStatus:
 *                 type: string
 *                 description: Marital status of the user
 *               aboutme:
 *                 type: string
 *                 description: Small introduction to yourself
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
  let personalDetails = {
    user: req.body.user,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    profession: req.body.profession,
    address: req.body.address,
    phone: req.body.phone,
    nic: req.body.nic,
    gender: req.body.gender,
    nationality: req.body.nationality,
    marital_status: req.body.maritalStatus,
    description: req.body.aboutme,
  };

  let docId = req.body.docId;

  let result = await personalDetailsService.createUpdatePersonalDetails(
    personalDetails,
    docId
  );

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /personal-details/by-doc/{docId}:
 *   delete:
 *     summary: Deletes a personal details for a selected user
 *     description: Deletes a personal details for a selected user
 *     tags: [Personal]
 *     parameters:
 *       - name: docId
 *         in: path
 *         required: true
 *         description: Id of the personal detail document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Personal details are deleted successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.delete("/by-doc/:docId", async (req, res, next) => {
  const docId = req.params.docId;

  let result = await personalDetailsService.deletePersonalDetailsByDoc(docId);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /personal-details/by-user/{userId}:
 *   delete:
 *     summary: Deletes a work details for a selected user
 *     description: Deletes a work details for a selected user
 *     tags: [Personal]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Email of the work detail document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Personal details are deleted successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.delete("/by-user/:email", async (req, res, next) => {
  const email = req.params.email;

  let result = await personalDetailsService.deletePersonalDetailsByUser(email);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
