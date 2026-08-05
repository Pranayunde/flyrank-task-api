const express = require("express");
const router = express.Router();

// GET /protected/profile
router.get("/profile", (req, res) => {

    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

    // Stage 2: Don't verify token yet
    res.status(200).json({
        message: "Access token received. Verification will be added in Stage 3."
    });
});

module.exports = router;