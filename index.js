var express = require("express");
const fs = require('fs')
var cors = require("cors");
require("dotenv").config();

const multer = require("multer");

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});
const upload = multer({ storage });

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Form action route-> '/api/fileanalyze'
// Form input name prop -> 'upfile'

// Setting up the route to post

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file)

  res.status(201).json({
    name: req.file.filename,
    type: req.file.mimetype,
    size: req.file.size
  })
  
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
