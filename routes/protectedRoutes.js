const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// GET /protected/profile
router.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        id: req.user.id,
        email: req.user.email,
        created_at: req.user.created_at
    });

});

// GET /protected/dashboard
router.get("/dashboard", authMiddleware, (req, res) => {

    res.status(200).json({
        message: `Welcome ${req.user.email}`,
        dashboard: "This is a protected dashboard."
    });

});

module.exports = router;