var mongoose = require("mongoose");

var { Instructor } = require("./models/instructorModel");
var { Student } = require("./models/studentModel");
var { CourseModel } = require("./models/courseModel");
var { Admin } = require("./models/adminModel");
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connected!");
});

exports.insertInstructor = function (instructor) {
  return Instructor.create(instructor);
};

exports.insertStudent = function (student) {
  return Student.create(student);
};
exports.findStudent = function (student) {
  return Student.findOne(student).populate("library");
};
exports.findInstructor = function (instructor) {
  return Instructor.findOne(instructor).populate("store");
};

exports.updateStudent = function (id, student) {
  return Student.findByIdAndUpdate(id, student);
};

exports.updateInstructor = function (id, instructor) {
  return Instructor.findByIdAndUpdate(id, instructor);
};
exports.addCourse = function (course) {
  return CourseModel.create(course);
};
exports.deleteCourse = function (id) {
  return CourseModel.findByIdAndRemove(id);
};
exports.findCourses = function () {
  return CourseModel.find({}).populate("IdInstructor");
};

exports.getStudentById = function (id) {
  return Student.findOne({ _id: id });
};

exports.getInstructorById = function (id) {
  return Instructor.findOne({ _id: id });
};

exports.getAllInstructors = function () {
  return Instructor.find();
};

exports.getInstructorByEmail = function (email) {
  return Instructor.findOne({ email: email });
};

exports.getStudentByEmail = function (email) {
  return Student.findOne({ email: email }).populate("library");
};

exports.findCourseById = function (id) {
  return CourseModel.findById(id).populate("IdInstructor");
};
exports.updateCourse = function (id, course) {
  return CourseModel.findByIdAndUpdate(id, course);
};

exports.getCourseById = function (id) {
  return CourseModel.findOne({ _id: id }).populate("IdInstructor");
};

exports.getStudentByEmail = function (email) {
  return Student.findOne({ email: email }).populate("library");
};

exports.getAdminByEmail = function (email) {
  return Admin.find({ email: email });
};

exports.insertAdmin = function (user) {
  return Admin.create(user);
};

exports.courseComment = function (id, comment) {
  return CourseModel.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: {
          commenterId: comment.commenterId,
          commenterUsername: comment.commenterUsername,
          text: comment.text,
          timestamp: new Date().getTime()
        }
      }
    },
    { new: true }
  );
};
exports.editcommentCourse = function (id) {
  return CourseModel.findById(id);
};
exports.deletecommentCourse = function (id, comment) {
  return CourseModel.findByIdAndUpdate(
    id,
    {
      $pull: {
        comments: {
          _id: comment.commentId
        }
      }
    },
    { new: true }
  );
};
exports.courserate = function (id, rate) {
  return CourseModel.findByIdAndUpdate(
    id,
    {
      $push: {
        rates: {
          raterId: rate.raterId,
          rates: rate.rates
        }
      }
    },
    { new: true }
  );
};
exports.ditrateCourse = function (id) {
  return CourseModel.findById(id);
};

exports.getAllStudents = function () {
  return Student.find();
};

exports.changeInstructorStatus = function (id, status) {
  return Instructor.findByIdAndUpdate(id, status);
};

exports.changeStudentStatus = function (id, status) {
  return Student.findByIdAndUpdate(id, status);
};

exports.findCourseByInstructor = function (id) {
  return CourseModel.find({ IdInstructor: id });
};


 

