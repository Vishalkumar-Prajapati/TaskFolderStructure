const message = {
    carNotFound: { sMessage: 'Car is not found' },
    brandNotFound: { sMessage: 'Brand is not found' },
    userNotFound: { sMessage: 'User is not found' },
    controllerError: { sMessage: 'Controller error' },
    middlewareError: { sMessage: 'Middleware error' },
    validatorError: { sMessage: 'Validator error' },
};

const status = {
    notFound : 404,
    internalError:500,
    ok:200,
    badRequest:400,
    unauthorized:401,
};

module.exports = {message , status };