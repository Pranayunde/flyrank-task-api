const express = require("express");
const supabase = require("../config/supabase");
const router = express.Router();

// GET /protected/profile
// GET /protected/profile
router.get("/profile", async (req, res) => {

    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }

    return res.status(200).json({
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at
    });

});

module.exports = router;