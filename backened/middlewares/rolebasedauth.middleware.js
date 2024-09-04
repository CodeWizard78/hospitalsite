export const authorizeRole = (roles) => {
    return (req, res, next) => {
        console.log("User object:", req.user); // Debugging line
        
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You don't have the required role" });
        }
        next();
    };
};
