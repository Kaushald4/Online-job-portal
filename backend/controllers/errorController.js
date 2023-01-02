export const errorHandler = (error, req, res, next) => {
    res.status(error.code || 500).json({
        success: false,
        message: error.message,
        stack: error.stack,
    });
};
