const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log('db connected');
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age:String,
  city:String
});

const User = mongoose.model('User', userSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post('/demo',async (req,res)=>{

    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.age = req.body.age;
    user.city = req.body.city;


    const doc = await user.save();


    console.log(doc);
    res.json(doc);
})


// server.put('/demo/:id', async (req, res) => {
//   try {
//     const id  = req.params.id;
//     const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error updating user');
//   }
// });


server.get('/demo', async(req,res)=>{
  console.log("query",req.query);
  // const username=req.query.username || "";
  // const age=req.query.age || "";
  // const city=req.query.city || "";


  const filters = {};

  if (req.query.username) {
    // Using a regex pattern with the 'i' flag for case-insensitive matching
    filters.username = { $regex: new RegExp(req.query.username, 'i') };
  }
  if (req.query.age) {
    filters.age = { $regex: new RegExp(req.query.age, 'i') }; // Example of using another operator
  }
  if (req.query.city) {
    filters.city = { $regex: new RegExp(req.query.city, 'i') };
  }

  // let data = await User.find(filters)
  // console.log(data);


  console.log(req.query);
  console.log("filters ",filters);

  let page=Number(req.query.page) || 1;
  let limit=Number(req.query.limit) || 10;

    //const limit = 5;
    const skip = (page-1)*limit;
    const count = await User.find({}).count();
    console.log(count);

    // const docs = await User.find().sort({username:-1}).skip(skip).limit(limit);
    const data=await User.find(filters).sort({username:-1}).skip(skip).limit(limit);
    console.log("the data",data.length);
    res.json({
      count:count,
      data1:data
    });

  // let data = await User.find(
  //   {
  //   "$or":[
  //     { "username":{$regex : username}},
  //     { "age":{$regex : age}},
  //     { "city":{$regex : city}}
  //   ]

  //   })
  //   console.log(data);

  // const query = {
  //   "username" : {$regex :username,$options:"i"}
  // }

    //let data 
    //res.send(data)
})

server.put('/demo/:id', async(req, res) => {
  const id = req.params.id;
  const update = req.body;

 const gh = await User.findOneAndUpdate(
    { _id:id },
    { $set: update },
    { returnOriginal: false }
  );
  console.log("backend put",gh)
  res.send(gh);
});

server.delete("/demo/:id", async (req, res) => {
  const id = req.params.id;
  let result= await User.deleteOne({_id: id});
  res.send(result);
});

server.get('/demo/:id', async (req, res) => {
  const id = req.params.id;
  console.log("params ",req.params);
  const result = await User.findOne({_id: id });
  console.log(result);
  res.send(result);

  // let user1 = new User();
  // user1.username = req.body.username;
  // //user.password = req.body.password;
  // user1.age = req.body.age;
  // user1.city = req.body.city;
  // const id = req.params.id;


  // // const doc = await user.save();
  // const result = await user1.save();//.findOne({_id: id });
  // console.log("this is result: ",result);
  // res.send(result);








  // try {
  //   // Query the MongoDB database using the ID
  //   const result = await User.findOne({_id: id });
  //   console.log(result);

  //   if (result) {
  //     res.send(result);
  //   } else {
  //     res.status(404).send({ message: 'Data not found' });
  //   }
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

// server.get('/demo',async (req,res)=>{

//   console.log(req.query);

//   let page=Number(req.query.page) || 1;
//   let limit=Number(req.query.limit) || 10;

//     //const limit = 5;
//     const skip = (page-1)*limit;
//     const count = await User.find({}).count();
//     console.log(count);

//     const docs = await User.find({}).sort({username:-1}).skip(skip).limit(limit);
//     console.log(docs);
//     res.json({
//       count:count,
//       doc:docs,
//     });
// })

server.listen(8080,()=>{
    console.log('server started')
})