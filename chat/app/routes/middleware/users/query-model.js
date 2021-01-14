const Constant = require('../../../util/constant');
const _ = require('underscore');


module.exports = class UserQ {

  static insertData (model, objToSave, callback) {
        Models[model].create(objToSave).then(result => {
            callback(null, result.dataValues);
        }).catch(err => {
            callback(err.errors);
        });
    };

    static getAllData(model, queryData, callback) {
        Models[model].findAll(queryData).then(result => {
            callback(null, result);
        }).catch (err => {
            callback(err);
        });
    };

    static getDataWithCountAll(model, queryData, callback) {
        Models[model].findAndCountAll(queryData).then(result => {
            callback(null, result);
        }).catch (err => {
            callback(err);
        });
    };

    static updateData(model, dataToUpdate, queryData, callback) {
        Models[model].update(dataToUpdate, queryData).then(rowsAffected => {
            callback(null, rowsAffected[0]);
        }).catch (err => {
            callback(err);
        });
    };

    static insertBulkData (model, objToSave, callback) {
        Models[model].bulkCreate(objToSave).then(result => {
            let insertedData = _.pluck(result, 'dataValues');
            callback(null, insertedData);
        }).catch(err => {
            callback(err.original);
        });
    };

    static deleteData (model, queryData, callback) {
        Models[model].destroy(queryData).then(rowsDeleted => {
            callback(null, rowsDeleted);
        }).catch(err => {
            callback(err);
        });
    };

    static rawQuery (query, params, queryType, callback) {
        sequelize.query(query, { replacements: params, type: queryType })
            .then(result => {
                callback(null, result);
            })
            .catch(err => {
                callback(err);
            })
    };
}