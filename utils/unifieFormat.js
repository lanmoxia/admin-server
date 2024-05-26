// 响应处理
function formatResponse(errno, errmsg, data = null) {
  const response = { errno, errmsg };
  if (data) {
    response.data = data;
  }
  return response;
}

module.exports = { formatResponse}