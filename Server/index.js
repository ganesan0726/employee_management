const express = require("express");
const cors = require("cors");
const connection = require("./utils/dbConfig");
const adminRouter = require("./routes/adminRoute");
const cookieParser = require("cookie-parser");

const app = express();

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/auth", adminRouter);

app.use(cookieParser());

//testing API

app.get("/", (req, res) => {
  res.json({ message: "Hello API" });
});
connection.connect((error) => {
  if (error) {
    console.log("Connection Error");
  } else {
    console.log("DB connected");
  }
});

//Port

const PORT = process.env.PORT || 8080;

//SERVER

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
