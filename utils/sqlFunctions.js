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

const getRecordByIdSorting = (tableName, idColumn, idValue, sortBy = "addedAt", order = "ASC") => {
  return new Promise((resolve, reject) => {
    // dozvoljene kolone za sortiranje
    const validColumns = ["addedAt", "title", "voteAverage"];
    const validOrder = ["ASC", "DESC"];

    const column = validColumns.includes(sortBy) ? sortBy : "addedAt";
    const sortOrder = validOrder.includes(order.toUpperCase()) ? order.toUpperCase() : "ASC";

    const query = `SELECT * FROM ${tableName} WHERE ${idColumn} = ? ORDER BY ${column} ${sortOrder}`;

    pool.query(query, [idValue], (err, results) => {
      if (err) {
        console.error("SQL Error:", err); // loguj grešku
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};



module.exports = {
  getAllRecords,
  checkRecordExists,
  insertRecord,
  updateRecord, 
  deleteRecord,
  getRecordById,
  getRecordByIdSorting
};