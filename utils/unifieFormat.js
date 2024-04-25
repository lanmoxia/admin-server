// 响应处理
function formatResponse(statusCode, message, data = null) {
  const response = { code: statusCode, message };
  if (data) {
    response.data = data;
  }
  return response;
}

module.exports = { formatResponse}