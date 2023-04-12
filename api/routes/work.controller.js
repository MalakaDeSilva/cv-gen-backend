const express = require("express");

const router = express.Router();

const workDetailsService = require("../service/work.service");

/**
 * @swagger
 * tags:
 *   name: Work
 *   description: API for managing work details
 */

/**
 * @swagger
 * /work-details/by-user/{userId}:
 *   get:
 *     summary: Returns a list of work details for a selected user
 *     description: Returns a list of work details for a selected user
 *     tags: [Work]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Email id of the user to retrieve work details
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: Work details are retrieved successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.get("/by-user/:email", async (req, res, next) => {
  const email = req.params.email;
  let result = await workDetailsService.getWorkDetailsByUser(email);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /work-details/:
 *   post:
 *     summary: Create a new work details object for a given user
 *     description: Creates a new work details object for a given user
 *     tags: [Work]
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
 *               company:
 *                 type: string
 *                 description: The company of the user
 *               period:
 *                 type: string
 *                 description: The period of time
 *               remarks:
 *                 type: string
 *                 description: Anything that needs to be highlighted
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
  let workDetails = {
    user: req.body.user,
    company: req.body.company,
    period: req.body.period,
    remarks: req.body.remarks,
  };

  let result = await workDetailsService.createUpdateWorkDetails(workDetails);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /work-details/:
 *   put:
 *     summary: Updates a new work details object for a given user
 *     description: Updates a new work details object for a given user
 *     tags: [Work]
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
 *               company:
 *                 type: string
 *                 description: The company of the user
 *               period:
 *                 type: string
 *                 description: The period of time
 *               remarks:
 *                 type: string
 *                 description: Anything that needs to be highlighted
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
  let workDetails = {
    user: req.body.user,
    company: req.body.company,
    period: req.body.period,
    remarks: req.body.remarks,
  };

  let docId = req.body.docId;

  let result = await workDetailsService.createUpdateWorkDetails(
    workDetails,
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
 * /work-details/by-doc/{docId}:
 *   delete:
 *     summary: Deletess a work details for a selected user
 *     description: Deletess a work details for a selected user
 *     tags: [Work]
 *     parameters:
 *       - name: docId
 *         in: path
 *         required: true
 *         description: Id of the work detail document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Work details are deleted successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.delete("/by-doc/:docId", async (req, res, next) => {
  const docId = req.params.docId;

  let result = await workDetailsService.deleteWorkDetailsByDoc(docId);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * @swagger
 * /work-details/by-user/{userId}:
 *   delete:
 *     summary: Deletess a work details for a selected user
 *     description: Deletess a work details for a selected user
 *     tags: [Work]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: Email of the work detail document
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Work details are deleted successfully.
 *       '403':
 *         description: Forbidden request.
 *       '401':
 *         description: Unauthorized request.
 */
router.delete("/by-user/:email", async (req, res, next) => {
  const email = req.params.email;

  let result = await workDetailsService.deleteWorkDetailsByUser(email);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
