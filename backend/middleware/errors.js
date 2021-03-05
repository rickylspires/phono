const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        
        let error = {...err}

        error.message = err.message

        // wrong Mongoose object ID error handling
        if(err.name === 'castError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400);
        }

        // wrong Mongoose object Validation handling
        if(err.name === 'validationError'){
            const message = object.values(err.errors).map(value => values.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose duplicate key errors
        if(err.code === 11000 ) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT error
        if(err.name === 'jsonWebTokenError'){
            const message = 'JSON Web Token in invalid. Try again!!!';
            error = new ErrorHandler(message, 400);
        }

        // Handling JWT expired
        if(err.name === 'TokenExpiredError'){
            const message = 'JSON Web Token in expired. Try again!!!';
            error = new ErrorHandler(message, 400);
        }
        
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'internal Server Error'
        })
    }
}
