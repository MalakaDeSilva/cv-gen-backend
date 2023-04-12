const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const eduDetailsService = require("../service/edu.service");

/**
 * @swagger
 * /edu-details/by-user/{userId}:
 *   get:
 *     description: Returns a list of education details for a selected user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Email id of the user to retrieve edu details
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: Education details are retrieved successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.get("/by-user/:email", async (req, res, next) => {
  const email = req.params.email;
  let result = await eduDetailsService.getEduDetailsByUser(email);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /edu-details/:
 *   post:
 *     summary: Create a new education details object for a given user
 *     description: Creates a new education details object for a given user
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
 *               institute:
 *                 type: string
 *                 description: The institute of the user
 *               period:
 *                 type: string
 *                 description: The period of time
 *               graduated:
 *                 type: boolean
 *                 description: Graduation status
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
  let eduDetails = {
    user: req.body.user,
    institute: req.body.institute,
    period: req.body.period,
    graduated: req.body.graduated,
  };

  let result = await eduDetailsService.createUpdateEduDetails(eduDetails);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /edu-details/by-doc/{docId}:
 *   delete:
 *     description: Deletess a education details for a selected user
 *     parameters:
 *       - name: docId
 *         in: path
 *         required: true
 *         description: Id of the edu detail document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Education details are deleted successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.delete("/by-doc/:docId", async (req, res, next) => {
  const docId = req.params.docId;

  let result = await eduDetailsService.deleteEduDetailsByDoc(docId);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /edu-details/by-user/{userId}:
 *   delete:
 *     description: Deletess a education details for a selected user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Email of the edu detail document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Education details are deleted successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.delete("/by-user/:email", async (req, res, next) => {
  const email = req.params.email;

  let result = await eduDetailsService.deleteEduDetailsByUser(email);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
