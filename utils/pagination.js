const isEmpty = require("./isEmpty");

exports.paginationQuery = (query = {}) => {
  let pagination = {
    skip: 0,
    limit: 10,
    page: 1,
  };

  if (!isEmpty(query) && !isEmpty(query.page) && !isEmpty(query.limit)) {
    pagination["skip"] = (Number(query.page) - 1) * Number(query.limit);
    pagination["limit"] = Number(query.limit);
    pagination["page"] = Number(query.page);
  }
  
  return pagination;
};
