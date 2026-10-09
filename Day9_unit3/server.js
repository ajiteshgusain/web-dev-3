// faqct  mongodb  offical  name  mongod
// show dbs

// use BTechRobotics -> create  database
//db  current :-  current   database

// here  collection ->  table
//  document ->  rows
// here ObjectId->primary key
// in mongodb  data type  of this  ObjectId  is   objectid only
//  db.createcollection('teachers')
// db.students.insertOne({
 //      name:'Ankit',
 //      Age:24,
//})
//db.stdudents.insertmany()

//db.student.find()
//db.student.insertMany([ {name:'data1', age:24}, {name:'data2', age:15}, {name:'data', age:12} ])
//db.student.deleteOne({ _id: ObjectId("65c2a1b3e4b0f123456789ab") })

//db.student.deleteMany({})

//db.student.updateOne(
//   { name: 'selena' }, 
//   { $set: { age: 21 } }
// )
// show dbs

// use BTechRobotics

db


// show collections 


// db.createCollection('teachers')


// db.students.insertOne({
//     name:"Ankit",
//     age:24,
//     _id:1
// })

// db.students.find()

// db.students.insertOne({
//     name:"Ankit",
//     age:24
// })


// db.students.insertMany([
//     {
//         name: 'Ankit',
//         age:19,
//         gender:'male',
//         course:'BTech',
//         cgpa:9
//     },
//     {
//         name: 'Rahul',
//         age:22,
//         gender:'male',
//         course:'BTech',
//         cgpa:7
//     },
//     {
//         name: 'Swati',
//         age:25,
//         gender:'female',
//         course:'BCA',
//         cgpa:9.8
//     },
//     {
//         name: 'Payal',
//         age:30,
//         gender:'female',
//         course:'BCA',
//         cgpa:6.5
//     },
//     {
//         name: 'Jigar',
//         age:17,
//         gender:'male',
//         course:'MCA',
//         cgpa:10
//     },
// ])



// db.students.deleteOne({
//      _id: 1
// })
// db.students.deleteOne({
//       _id: ObjectId('6ac364e7de22a642f9cf8c10')
// })

// db.students.deleteMany({
//     gender: 'female'
// })



// db.students.insertMany([
//      {
 
//     name: 'Swati',
//     age: 25,
//     gender: 'female',
//     course: 'BCA',
//     cgpa: 9.8
//   },
//   {
  
//     name: 'Payal',
//     age: 30,
//     gender: 'female',
//     course: 'BCA',
//     cgpa: 6.5
//   }
// ])



// db.students.updateOne(
//     { _id: ObjectId('6ac5c2ee20b81feb7fa4df26') },
//     { $set : {name : 'Ankit Singh'} }
// )

// db.students.updateMany(
//     {course:'BTech'},
//     {$set : {course : 'BCA'}}
// )



// db.students.updateMany(
//     {course:'BTech'},
//     {$set : {course : 'BCA'}}
// )