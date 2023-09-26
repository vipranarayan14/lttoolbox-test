

exports.handler = async (event, context) => {
  const results = "Hi";

  return {
    statusCode: statusCode.SUCCESS,
    body: JSON.stringify(results),
  };
};
