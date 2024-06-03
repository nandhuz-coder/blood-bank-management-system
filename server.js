const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path=require("path");
//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors({
 origin:"https://blood-bank-app-hicu.onrender.com",
}));
app.use(morgan("dev"));

//routes
// 1 test route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/inventory",require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics",require("./routes/analyticsRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));

const __dirname1=path.resolve();
if(process.env.NODE_ENV === "production")
{
  app.use(express.static(path.join(__dirname1,"/client/build")));

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"client","build","index.html"));
})
}
else{
  app.get("/", (req, res) => {
  res.send("API is running successfully");
    
});
}
//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running  On Port ${process.env.PORT}`
      .bgBlue.white
  );
});
