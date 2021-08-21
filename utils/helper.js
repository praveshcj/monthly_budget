const jwt = require('jsonwebtoken');

const getJwtToken = (data, privateKey) => {
    return jwt.sign(data, privateKey);
}

const verifyJwtToken = (token, privateKey) => {
    let tokenData, isTokenVerified;
    try{
        tokenData = jwt.verify(token, privateKey);
        isTokenVerified = true;
    } catch(e) {
        isTokenVerified = false;
    }
    return {
        tokenData,
        isTokenVerified,
    };
}

module.exports = {
    getJwtToken,
    verifyJwtToken,
}