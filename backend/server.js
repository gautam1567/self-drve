const express=require("express");
const cors=require("cors");
require("dotenv").config();
const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(express.json());

app.get("/api/health",(req,res)=>res.json({success:true,message:"SELF DRVE API is running"}));
app.get("/api/vehicles",(req,res)=>res.json({success:true,data:[]}));
app.post("/api/enquiries",(req,res)=>res.status(201).json({success:true,message:"Enquiry endpoint ready",data:req.body}));
app.post("/api/bookings",(req,res)=>res.status(201).json({success:true,message:"Booking endpoint ready",data:req.body}));

app.listen(PORT,()=>console.log(`SELF DRVE API running on http://localhost:${PORT}`));
