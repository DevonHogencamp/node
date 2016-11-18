module.exports = function (req, res, next) {
    if (req.headers.authorization === 'my secret key') {
        next();
    } else {
        return res.forbidden('No valid Authorize header passed.');
    }
};
