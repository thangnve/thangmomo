var express = require('express');
var router = express.Router();
var fs = require('fs')

var db = 'mongodb+srv://thangnvph13623:y52NM2GQn8PDq7y8@cluster0.iegjn.mongodb.net/student?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra" + error)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (request, response) {

  response.render('index')
})

// b1 : định nghĩa Schema - model
var studentSch = new mongoose.Schema({
  email: 'string',
  name: 'string',
  sdt: 'string'
});
// b2 : khai báo Schema với thư viện mongosee
var Student = mongoose.model('student', studentSch);

router.post('/student', function (request, response) {

  var email = request.body.email;
  var ten = request.body.name;
  var sdt = request.body.sdt;

  console.log(email + ten + sdt);

  const data = new Student({
    email: email,
    name: ten,
    sdt: sdt
  });
  data.save(function (error) {
    var mes;
    if (error == null) {
      mes = 'Them thanh cong'
      console.log('them thanh cong')
    } else mes = error
    response.render('index', {message: mes})
  })


  router.get('/Danhsach', function (request, response) {
    Student.find({}, function (err, data) {

      if (err) {
        response.send("File tối thiểu 2MB hoặc upload không được quá 5 file hoặc file không phải jpg");
        return;
      }
      else {
        response.send(data);

      }
      response.render('Danhsach')
  })
    })
  // lấy danh sách

  // xóa
  Student.deleteOne({_id: ''}, function (error) {

  })

  // sửa
  Student.updateOne({_id: ''}, {email: 'ABC@gmail.com', name: 'AAAAAAA'}, function (error) {

  })


})

module.exports = router;
