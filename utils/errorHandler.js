// utils/errorHandler.js
const errorMap = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};

function handleErrors(err, req, res, next) {
  // 检查是否存在状态码且不为200
  if (err.status && err.status !== 200 && errorMap[err.status]) {
    const status = err.status;
    const errorMessage = errorMap[status];
    res.status(status).json({ errno: status.toString(), errmsg: errorMessage });
  } else {
    // 处理没有状态码或者状态码为200的错误
    const status = 200;
    const errno = err.errno || 'UnknownError';
    const errmsg = err.errmsg || 'An unknown error occurred';
    res.status(status).json({ errno, errmsg });
  }
}

module.exports = handleErrors;