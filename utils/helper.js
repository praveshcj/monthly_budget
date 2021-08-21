const jwt = require('jsonwebtoken');

const getJwtToken = (data, privateKey) => {
    return jwt.sign(data, privateKey);
}

module.exports = {
    getJwtToken,
}