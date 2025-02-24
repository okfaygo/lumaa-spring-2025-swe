import pkg from 'jsonwebtoken';
const { verify } = pkg;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user data to the request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};

export default authMiddleware;
// The code above is an example of a middleware function that checks for a valid JWT token in the request headers.
// If the token is valid, it decodes the token and adds the user data to the request object.