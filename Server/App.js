const express = require("express");
const app = express();

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sv_db',
  password: '616944@TtT',
  port: 5432,
})
app.use(express.json());

app.get("/",function(req,res){});
/**================SinhVien================================================*/

//api get data from progres
app.get("/sinhvien",function(req,res){ 
    //get data
    pool.query('SELECT * FROM sinhvien ORDER BY mssv ASC', (err, response) => {
      if(err){
        console.log(err);
      }else{
        res.send(response.rows);
      }   
    })
});

//get mssv
//api get data from progress
app.get("/sinhvien/mssv",function(req,res){ 
    //get data
    pool.query('SELECT mssv FROM sinhvien ORDER BY mssv ASC', (err, response) => {
      if(err){
        console.log(err);
      }else{
        res.send(response.rows);
      }   
    })
});

//Insert data 
app.post('/addSV',function(req,res,next){
  var mssv=req.body.mssv,
  hten=req.body.hten;
  pool.query("INSERT INTO sinhvien (mssv,hten) VALUES ($1,$2)",
  [mssv,hten],(err,response)=>{
    if(err){
      res.send(err);
    }else{
      res.send("Success");
    }
  })
});

//Del data 
app.delete('/delSV/:mssv',function(req,res,next){
   const {mssv}= req.params;
  pool.query("DELETE FROM sinhvien WHERE mssv=$1",
  [mssv],(err,response)=>{
    if(err){
      res.send(err);
    }else{
      res.send("SV was delete !!!");
    }
  })
});

//update 
app.put("/putSV/:mssv", async(req,res)=>{
  try{
    const {mssv}= req.params;
    const {hten}=req.body;
    const update = await pool.query("UPDATE sinhvien SET hten=$1 WHERE mssv=$2",
    [hten,mssv]);
    res.json("SV was update");
  }catch(err){
    console.error(err.message);
  }
});

/**================MonHoc==================================================*/

//get data monhoc 
app.get("/monhoc",function(req,res){
  
   // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
 
    //get data
    pool.query('SELECT * FROM public.monhoc ORDER BY id ASC ', (err, response) => {
      if(err){
        console.log(err);
      }else{
        res.send(response.rows);
      }   
    })
});
//get mamon
//api get data from progress
app.get("/monhoc/mamon",function(req,res){ 
    //get data
    pool.query('SELECT mamon FROM monhoc ORDER BY mamon ASC', (err, response) => {
      if(err){
        console.log(err);
      }else{
        res.send(response.rows);
      }   
    })
});

//delete
app.delete('/delMH/:mamon',function(req,res,next){
  const {mamon}=req.params;
  pool.query("DELETE FROM monhoc WHERE mamon=$1",
  [mamon],(err,response)=>{
    if(err){
      res.send(err);
    }else{
      res.send("MH was delete !!!");
    }
  })
});

app.post('/addMH',function(req,res,next){
  var mamon=req.body.mamon,
  tenmon=req.body.tenmon,
  sotc=req.body.sotc;
  pool.query("INSERT INTO monhoc (mamon,tenmon,sotc) VALUES ($1,$2,$3)",
  [mamon,tenmon,sotc],(err,response)=>{
    if(err){
      res.send(err);
    }else{
      res.send("Succes");
    }
  })
});

app.put("/putMH/:mamon", async(req,res)=>{
  try{
    const {mamon}= req.params;
    const {tenmon,sotc}=req.body;
    const update = await pool.query("UPDATE monhoc SET tenmon=$1, sotc=$2 WHERE mamon=$3",
    [tenmon,sotc,mamon]);
    res.json("MH was update");
  }catch(err){
    console.error(err.message);
  }
});
/**============================HOC====================================== */
app.get("/hoc",function(req,res){
  
   // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
 
    //get data
    pool.query('SELECT * FROM public.hoc ORDER BY id ASC ', (err, response) => {
      if(err){
        console.log(err);
      }else{
        res.send(response.rows);
      }   
    })
});

app.delete('/delHOC/:id',function(req,res,next){
  const {id}=req.params;
  pool.query("DELETE FROM hoc WHERE id=$1",
  [id],(err,response)=>{
    if(err){
      res.send(err);
    }else{
      res.send("HOC was delete !!!");
    }
  })
});

//Insert data 
app.post('/addHOC' ,function(req,res,next){
  var mssv=req.body.mssv,
  mamon=req.body.mamon,
  diem=parseFloat(req.body.diem);
  pool.query("INSERT INTO hoc (mssv,mamon,diem) VALUES ($1,$2,$3)",
  [mssv,mamon,diem],(err,response)=>{
    if(err){
      res.send(err);
    }else{
      res.send("Success");
    }
  })
});

//update 
app.put("/putHOC/:id", async(req,res)=>{
  try{
    const {id}= req.params;
    const {diem}=req.body;
    const update = await pool.query("UPDATE hoc SET diem=$1 WHERE id=$2",
    [diem,id]);
    res.json("Hoc was update");
  }catch(err){
    console.error(err.message);
  }
});
/**================================================================== */
//npx nodemon app.js
//thay doi port set 3000cr chay lai
const port = process.env.PORT || 4000;
app.listen(port,()=>
    console.log(`Listening on port ${port}...`)
);