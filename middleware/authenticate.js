const IsAuthenticated = (req, res, next) => {
    console.log('Session User:', req.session.user);
    if (req.session.user == undefined) {
        return res.status(401).json({ message: "You do not have access." });
    }
    next();
};

module.exports = {
    IsAuthenticated
}
