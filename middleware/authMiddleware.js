const supabase = require("../config/supabase");

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Access token required"
        });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }

    // Save logged-in user for later use
    req.user = data.user;

    // Continue to the route
    next();
};

module.exports = authMiddleware;