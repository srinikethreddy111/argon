const express = require('express');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require("fs");


const app = express();
app.use(express.json());
app.use(cors());
let db = null;
const dbPath = path.join(__dirname, "./argon.db");


const initializeDatabaseAndStarServer = async () => {
    try {
        db = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database,
        })
        app.listen(3001, () => {
            console.log('Server Started At http://localhost:3001/')
        })
    } catch (e) {
        console.log('Error: ' + e.message())
        process.exit(1)
    }
}


app.get("/locations",async(req,res)=>{
  res.end(JSON.stringify({locations: [
    {displayText: "Pune", id: "PUNE"},
    {displayText: "Mumbai", id: "MUMBAI"},
    {displayText: "Hyderabad", id: "HYDERABAD"},
    {displayText: "Delhi", id: "DELHI"},
    {displayText: "Bangalore", id: "BANGALORE"},
    {displayText: "Chennai", id: "CHENNAI"}
  ]})
  )
})


app.get("/appliances",async(req,res)=>{
  const result = await db.all("select * from appliance_types;");
  res.send(JSON.stringify({appliances: result}))
})


app.get('/featured-technicians/', async (req, res) => {
  try{
    const result = await db.all("select * from technicians;");
    const jsonResult = JSON.stringify({result:[result.map(t=>{
      const photoBase64 = t.photo.toString('base64');
      return {
        technician_id: t.technician_id,
        name: t.name,
        photo: `data:image/png;base64,${photoBase64}`, 
        specialization: t.specialization,
        rating: t.rating,
        description: t.description
      }
    })]})
    res.send(jsonResult);
  }
  catch(e){
    console.log('Error: ', e.message)
    res.status(500)
    res.send('Server Error')
  }
});

app.post('/login', async (req, res) => {
    let getUser = await db.get(
      `SELECT * FROM users WHERE email='${req.body.email}';`,
    )
    if (getUser === undefined) {
      res.status(400)
      res.send('Invalid user')
    } else {
      let isValidPasswd = await bcrypt.compare(
        req.body.password,
        getUser.password,
      )
      if (isValidPasswd) {
        const {email} = req.body
        const payload = {email}
        const jwtToken = await jwt.sign(payload, 'UserLogin')
        res.send({jwtToken})
      } else {
        res.status(400)
        res.send('Invalid password')
      }
    }
})





initializeDatabaseAndStarServer();
