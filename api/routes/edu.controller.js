const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const EduDetails = require("../model/edu.details");
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
 *         description: ID of the user to retrieve edu details
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/by-user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  let result = await eduDetailsService.getEduDetailsByUserId(userId);

  if (typeof result["error"] != "undefined") {
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
});

module.exports = router;
