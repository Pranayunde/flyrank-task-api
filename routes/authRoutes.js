const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// POST /auth/signup
router.post("/signup", async (req, res) => {

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }

    return res.status(201).json(data);
});

// POST /auth/login
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return res.status(401).json({
            error: "Invalid login credentials"
        });
    }

    return res.status(200).json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        user: data.user
    });
});

// POST /auth/logout
router.post("/logout", async (req, res) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }

    return res.status(204).send();

});

module.exports = router;