const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        const decoded = jwt.verify(token, "kushal@126");
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send("Unauthorized");
    }
    
};

module.exports = authenticate;

