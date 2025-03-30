const validateJSON = (req, res, next) => {
    if (req.is('application/json')) {
        next();
    } else {
        res.status(415).send({ error: 'Unsupported Media Type. Please use application/json' });
    }
};

module.exports = validateJSON;