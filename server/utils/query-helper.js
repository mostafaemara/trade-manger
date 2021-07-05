exports.formatQuery = (query) => {
  let queryStr = JSON.stringify(query);
  queryStr = queryStr.replace(
    /\b(gte)|(gt)|(lte)|(lt)\b/g,
    (match) => `$${match}`
  );

  return JSON.parse(queryStr);
};
