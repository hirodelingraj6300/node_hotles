const jwt = require('jsonwebtoken')

const jwtAuthMiddleware =(req, res, next) => {

    // extract the jwt token from request headers
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({error : 'Unauthorized'});

    try {
        // verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded
        next();

    }catch(err){
        console.error(err);
        res.status(401).json({error : 'Invalid token'});
    }
}

//  function to generate JWT token
const generateToken = (userData) =>{
    // Generate a new Jwt Token using user data
    return jwt.sign(userData, process.env.JWT_SECRET);
}

// this is module.exports = {jwtAuthMiddleware,generateToken }; 3/07/25
// this is module.exports = {jwtAuthMiddleware,generateToken }; 3/07/25
// this is module.exports = {jwtAuthMiddleware,generateToken }; 3/07/25

module.exports = {jwtAuthMiddleware,generateToken };