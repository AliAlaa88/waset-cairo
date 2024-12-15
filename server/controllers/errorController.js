export default (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    res.status(error.statusCode).json({
        status: error.statusCode,
        msg: error.message
    }); 
    next();
}