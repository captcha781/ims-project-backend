// import package

// import lib
import isEmpty from "../lib/isEmpty";

export const paginationQuery = (query = {}) => {
  let pagination = {
    skip: 0,
    limit: 10,
    page: 1,
  };
  // console.log(query,"queryyyyyyyyyyyyyy");
  if (!isEmpty(query) && !isEmpty(query.page) && !isEmpty(query.limit)) {
    pagination["skip"] = (Number(query.page) - 1) * Number(query.limit);
    pagination["limit"] = Number(query.limit);
    pagination["page"] = Number(query.page);
  }
  // console.log(pagination,"pagination................");
  return pagination;
};

export const filterQuery = (query = {}, nonRegExp = []) => {
  let filter = {};

  if (!isEmpty(query)) {
    for (const [key, value] of Object.entries(query)) {
      if (key != "page" && key != "limit") {
        if (nonRegExp.includes(key)) {
          filter[key] = Number(value);
        } else {
          filter[key] = new RegExp(value, "i");
        }
      }
    }
  }
  return filter;
};

export const filterProofQuery = (
  query = {},
  nonRegExp = [],
  additionKey = ""
) => {
  let filter = {};

  if (!isEmpty(query)) {
    for (const [key, value] of Object.entries(query)) {
      if (key != "page" && key != "limit") {
        if (nonRegExp.includes(key)) {
          filter[additionKey + "." + key] = Number(value);
        } else {
          filter[additionKey + "." + key] = new RegExp(value, "i");
        }
      }
    }
  }
  return filter;
};

export const filterSearchQuery = (query = {}, fields = []) => {
  console.log("search is working", fields);
  let filterQuery = {};
  if (!isEmpty(query) && !isEmpty(query.search)) {
    let filterArray = [];
    for (const key of fields) {
      let filter = {};
      filter[key] = new RegExp(query.search, "i");
      filterArray.push(filter);
    }
    filterQuery = { $or: filterArray };
  }
  console.log(filterQuery, "filterquery");
  return filterQuery;
};

export const ChartFilter = (query = {}) => {
  let filterObj = query;
  let filter = {};
  console.log(filterObj);
  if (filterObj == "Day") {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    filter["createdAt"] = { $gte: start, $lt: end };
  }
  if (filterObj == "Month") {
    // var currentDate = new Date();
    // var year = currentDate.getFullYear();
    // var month = currentDate.getMonth();
    // var daysInMonth = new Date(year, month, 0).getDate();
    // var start1 = new Date(year, month, 1);
    // var end1 = new Date(year, month, daysInMonth);

    var today = new Date();
    var firstDayMonth = new Date(today.setDate(1));
    var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    lastDayMonth.setHours(23, 59, 59, 0);
    filter["createdAt"] = {
      $gte: firstDayMonth,
      $lt: lastDayMonth,
    };
  }
  if (filterObj == "Year") {
    var month = new Date();
    month.setDate(month.getDate() - 360);
    filter["createdAt"] = {
      $gte: month,
    };
  }
  return filter;
};
/**
 * Filter
 * fs_ -> Filter String
 * fn_ -> Filter Number
 * fd_ -> Filter Date
 * sedf_ -> start && end  Filter Date

 */
export const columnFillter = (query = {}) => {
  let fillterObj = JSON.parse(query.fillter);

  // console.log("fillterObjfillterObj",fillterObj)
  let filterQuery = {};
  if (!isEmpty(fillterObj)) {
    for (const key in fillterObj) {
      if (key.substring(0, 3) == "fs_") {
        // google 2fa status fillter
        if (key.replace("fs_", "") == "google2Fa.secret") {
          if (fillterObj[key] == "Enabled") {
            filterQuery = {
              [key.replace("fs_", "")]: { $ne: "" },
            };
          } else if (fillterObj[key] == "Disabled") {
            filterQuery = {
              [key.replace("fs_", "")]: { $eq: "" },
            };
          } else if (fillterObj[key] == "All") {
            filterQuery;
          }
        }
        //active status
        else if (fillterObj[key] == "active") {
          filterQuery = {
            [key.replace("fs_", "")]: { $eq: "active" },
          };
        } else if (fillterObj[key] == "all") {
          filterQuery;
        }
        //kyc fillter
        else if (key.replace("fs_", "") == "kycStatus") {
          if (fillterObj[key] == "approved") {
            filterQuery = {
              $and: [
                { "idProof.status": "approved" },
                { "addressProof.status": "approved" },
              ],
            };
          } else if (fillterObj[key] == "pending") {
            filterQuery = {
              $or: [
                { "idProof.status": "pending" },
                { "idProof.status": "rejected" },
                { "addressProof.status": "rejected" },
                { "addressProof.status": "pending" },
              ],
            };
          } else if (fillterObj[key] == "") {
            filterQuery;
          }
        } else if (
          key.replace("fs_", "") == "status" ||
          key.replace("fs_", "") == "emailStatus" ||
          key.replace("fs_", "") == "phoneStatus"
        ) {
          if (fillterObj[key] == "") {
            filterQuery;
          } else {
            filterQuery = {
              [key.replace("fs_", "")]: { $eq: fillterObj[key] },
            };
          }
        }
        //string fillter
        else {
          // filterQuery = {
          //   [key.replace("fs_", "")]: new RegExp(fillterObj[key], "i"),
          // };
          filterQuery[key.replace("fs_", "")] = new RegExp(
            fillterObj[key],
            "i"
          );
          // console.log(
          //   "string filtere .............. eneteteteteteet",
          //   filterQuery
          // );
        }
      }
      //date fillter
      else if (key.substring(0, 3) == "fd_") {
        console.log(fillterObj, "fillterObj");
        let startDate = new Date(fillterObj[key]);
        let endDate = new Date(fillterObj[key]);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        filterQuery[key.replace("fd_", "")] = {
          $gte: startDate,
          $lt: endDate,
        };
        // filterQuery = {
        //   [key.replace("fd_", "")]: {
        //     $gte: startDate,
        //     $lt: endDate,
        //   },
        // };

        // console.log(
        //   "fillterObj[key]fillterObj[key]fillterObj[key]",
        //   filterQuery
        // );
        if (key === "fd_startTimeStamp" || key === "fd_endTimeStamp") {
          const toTimestamp = (strDate) => {
            const dt = Date.parse(strDate);
            return dt;
          };
          let startDate = new Date(fillterObj[key]);
          let endDate = new Date(fillterObj[key]);
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
          var start = toTimestamp(startDate);
          var end = toTimestamp(endDate);
          filterQuery = {
            [key.replace("fd_", "")]: {
              $gte: start,
              $lt: end,
            },
          };
        }
      } else if (key.substring(0, 5) == "sefd_") {

        console.log("datafilter strat date ened date emeter ......")
        // console.log(
        //   "fillterObj[key]fillterObj[key]fillterObj[key]",
        //   fillterObj[key]
        // );
        // if (!isEmpty(fillterObj[key])) {
        let startDate = new Date(fillterObj[key].startDate);
        let endDate = new Date(fillterObj[key].endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        filterQuery[key.replace("sefd_", "")] = {
          $gte: startDate,
          $lt: endDate,
        };
        // filterQuery = {
        //   [key.replace("sefd_", "")]: {
        //     $gte: startDate,
        //     $lt: endDate,
        //   },
        // };
        // }
      }
      //number fillter
      else if (key.substring(0, 3) == "fn_") {
        filterQuery[key.replace("fn_", "")] = parseFloat(fillterObj[key]);
      }
    }
  }
  // console.log("filterQueryfilterQuery", filterQuery);
  return filterQuery;
};

// "$gte": new Date("2014-08-01"), "$lt": new Date("2014-08-02")
