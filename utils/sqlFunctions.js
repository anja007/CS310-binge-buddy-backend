const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);

const getAllRecords = (tableName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;
    pool.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateRecord = (tableName, idColumn, idValue, updatedFields) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${tableName} SET ? WHERE ${idColumn} = ?`;
    pool.query(query, [updatedFields, idValue], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const deleteRecord = (tableName, idColumn, idValue) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${tableName} WHERE ${idColumn} = ?`;
    pool.query(query, [idValue], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const getRecordById = (tableName, idColumn, idValue) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${idColumn} = ?`;
    pool.query(query, [idValue], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};



module.exports = {
  getAllRecords,
  checkRecordExists,
  insertRecord,
  updateRecord, 
  deleteRecord,
  getRecordById
};