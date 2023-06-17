const jwt = require('jsonwebtoken')
const SECRET_KEY = 'group3ProjectEcommerce'

function authenticateToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err)
                return res.status(403).json({error: "Invalid token"});
            req.user = user.username;
            next();
        });
    } else {
        res.status(401).json({error: "Invalid token"});
    }
}

module.exports = authenticateToken