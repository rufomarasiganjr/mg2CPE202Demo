var express = require('express');

const jwt = require('jsonwebtoken');

var router = express.Router();

var dbConn = require('../../config/db.js');

// Routes HERE

// INSERT
// @routes POST temperature/add
// @desc INSERT data to the databse
// @access PRIVATE
router.post('/add', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    res.status(200).json({ success: false, msg: 'Error, Token was not found' });
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

  console.log(decodedToken.data['email']);

  var userEmail = decodedToken.data['email'];

  var temperature = req.body.temperature;
  var deviceId = req.body.deviceId;
  var readingDate = req.body.date;

  sqlQuery = `INSERT INTO temp_tb(temperature,device_id,date) VALUES(${temperature},"${deviceId}","${readingDate}")`;

  dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// VIEW
// @routes GET temperature/view
// @desc View Data
// @access PUBLIC
router.get('/view', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(200).json({
      success: false,
      msg: 'Error, Token not found',
    });
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

  sqlQuery = `SELECT * FROM temp_tb`;
  dbConn.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// UPDATE

// DELETE
// @routes DELETE temperature/delete/:id
// @desc DELETE Data
// @access PRIVATE

module.exports = router;
