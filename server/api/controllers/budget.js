'use strict';
require('../models/budget');
var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
var databaseModel = mongoose.model('budget');
var databaseAccountsRecordsModel = mongoose.model('bankAccountRecord');
var Utils = require('../utils/utils.js');

exports.view_filtered = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let page = body.page ? body.page : 1;
  let records = body.pagerRecords ? parseInt(body.pagerRecords) : 20;
  let orderDir = body.dir === `ASC` ? 1 : -1;
  let searchPhrase = body.searchPhrase ? body.searchPhrase : `1`;
  let query = {};
  if (searchPhrase !== `1` && searchPhrase !== ``) {
    query = {
      $or: [
        {
          accountDescription: {
            $regex: new RegExp(searchPhrase, `i`),
          },
        },
        {
          accountNumber: {
            $regex: new RegExp(searchPhrase, `i`),
          },
        },
      ],
    };
  }

  if (body.state != `all`) {
    query['canceled'] = body.state;
  }

  databaseModel
    .countDocuments(query)
    .then((pCount) => {
      _response.totalRecords = pCount;
      databaseModel
        .find(query)
        .sort({
          description: orderDir,
        })
        .skip(page * records - records)
        .limit(records)
        .then((pResults) => {
          _response.data = pResults;
          Utils.returnSuccess(_response, res);
        })
        .catch((err) => {
          Utils.returnError(err, res);
        });
    })
    .catch((err) => {
      Utils.returnCountError(res);
    });
};

exports.view_dash = async (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let filter = {
    description: 1,
  };
  let query = {
    canceled: 'false',
  };
  const totalRecords = await databaseModel
    .countDocuments(query)
    .then((pCount) => {
      return pCount;
    })
    .catch((err) => {
      Utils.returnCountError(res);
    });

  _response.totalRecords = totalRecords;

  const budgetItems = await databaseModel
    .find(query)
    .sort(filter)
    .then((pResults) => {
      return pResults;
    })
    .catch((err) => {
      Utils.returnError(err, res);
    });

  let responseBudget = budgetItems;

  _response.data = responseBudget;
  Utils.returnSuccess(_response, res);
};

exports.budget_data = async (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let filter = {
    description: 1,
  };
  let query = {
    canceled: 'false',
  };
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  let budgetData = [];
  let year = body.year;
  let budgetItem = body.budgetItem;
  for (let indexB = 0; indexB < months.length; indexB++) {
    let month = months[indexB];

    let resPayment = 0;
    let resBudget = budgetItem.budget;
    let resActual = budgetItem.actual;

    let find = {
      budgetYear: year.toString(),
      budgetMonth: month,
      budgetId: budgetItem._id,
    };

    resPayment = await databaseAccountsRecordsModel.find(find).then((pRecordRes) => {
      let payments = 0;
      if (pRecordRes && pRecordRes.length) {
        for (let index = 0; index < pRecordRes.length; index++) {
          payments += Math.abs(pRecordRes[index]['debit']);
        }
      }
      return payments;
    });

    const returnData = {
      date: `${year}-${month}-01`,
      budget: resBudget,
      actual: resActual,
      payment: resPayment,
    };
    budgetData.push(returnData);
  }

  _response.data = budgetData;
  Utils.returnSuccess(_response, res);
};

// exports.view_dash = async (req, res) => {
//   let _response = new Utils.newResponse();
//   let body = req.body;
//   let filter = {
//     description: 1,
//   };
//   let query = {
//     canceled: 'false',
//   };
//   const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
//   const totalRecords = await databaseModel
//     .countDocuments(query)
//     .then((pCount) => {
//       return pCount;
//     })
//     .catch((err) => {
//       Utils.returnCountError(res);
//     });

//   _response.totalRecords = totalRecords;

//   const budgetItems = await databaseModel
//     .find(query)
//     .sort(filter)
//     .then((pResults) => {
//       return pResults;
//     })
//     .catch((err) => {
//       Utils.returnError(err, res);
//     });

//   let responseBudget = [];

//   for (let indexA = 0; indexA < budgetItems.length; indexA++) {
//     /** start month loop */
//     let budgetData = [];
//     for (let indexB = 0; indexB < months.length; indexB++) {
//       let year = body.year;
//       let month = months[indexB];

//       let resPayment = 0;
//       let resBudget = budgetItems[indexA].budget;
//       let resActual = budgetItems[indexA].actual;

//       let find = {
//         budgetYear: year.toString(),
//         budgetMonth: month,
//         budgetId: budgetItems[indexA]._id,
//       };

//       resPayment = await databaseAccountsRecordsModel.find(find).then((pRecordRes) => {
//         let payments = 0;
//         if (pRecordRes && pRecordRes.length) {
//           for (let index = 0; index < pRecordRes.length; index++) {
//             payments += Math.abs(pRecordRes[index]['debit']);
//           }
//         }
//         return payments;
//       });

//       const returnData = {
//         date: `${year}-${month}-01`,
//         budget: resBudget,
//         actual: resActual,
//         payment: resPayment,
//       };
//       budgetData.push(returnData);
//     }

//     // console.log(budgetData);
//     /** end month loop */
//     budgetItems[indexA].budgetData = budgetData;
//     responseBudget.push(budgetItems[indexA]);
//   }

//   _response.data = responseBudget;
//   Utils.returnSuccess(_response, res);
// };

exports.view_all = (req, res) => {
  let _response = new Utils.newResponse();
  let body = req.body;
  let filter = {
    accountDescription: 1,
  };
  let query = {};

  databaseModel
    .countDocuments(query)
    .then((pCount) => {
      _response.totalRecords = pCount;
      databaseModel
        .find(query)
        .sort(filter)
        .then((pResults) => {
          _response.data = pResults;
          Utils.returnSuccess(_response, res);
        })
        .catch((err) => {
          Utils.returnError(err, res);
        });
    })
    .catch((err) => {
      Utils.returnCountError(res);
    });
};

exports.edit_record = (req, res) => {
  let _response = new Utils.newResponse();
  databaseModel
    .findById(req.params.id)
    .then((pResults) => {
      _response.data = pResults;
      Utils.returnSuccess(_response, res);
    })
    .catch((err) => {
      Utils.returnError(err, res);
    });
};

exports.add_record = (req, res) => {
  let _response = new Utils.newResponse();
  let new_record = new databaseModel(req.body);

  let query = {
    $and: [
      {
        description: new_record.description,
      },
    ],
  };

  if (!new_record.description) {
    Utils.returnBadData(res);
  } else {
    databaseModel
      .find(query)
      .then((pResults) => {
        if (pResults) {
          _response.data = pResults;

          if (pResults.length == 0) {
            new_record
              .save()
              .then((pResults) => {
                _response.message = `record added`;
                _response.data = pResults;
                Utils.returnSuccess(_response, res);
              })
              .catch((err) => {
                Utils.returnError(err, res);
              });
          } else if (pResults.length == 1) {
            Utils.returnRecordExist(res);
          } else if (pResults.length > 1) {
            Utils.returnDuplicate(res);
          }
        } else {
          Utils.returnFindError(res);
        }
      })
      .catch((err) => {
        Utils.returnError(err, res);
      });
  }
};

exports.update_record = (req, res) => {
  let newRecord = req.body;
  if (newRecord._id) {
    delete newRecord._id;
  }
  if (!newRecord.description) {
    Utils.returnBadData(res);
  } else {
    databaseModel
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: newRecord,
        },
        {
          new: true,
        }
      )
      .then((pResults) => {
        if (pResults.acknowledged) {
          Utils.returnUpdated(res);
        } else {
          Utils.returnNotUpdated(res);
        }
      })
      .catch((err) => {
        Utils.returnCountError(res);
      });
  }
};

exports.update_status = (req, res) => {
  Utils.update_status(req, res, databaseModel);
};

exports.delete_record = (req, res) => {
  Utils.delete_record(req, res, databaseModel);
};
