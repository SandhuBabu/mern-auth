const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');

const app = express();
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }
));
app.use('/', indexRouter);

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log("Server started at port "+PORT);
})
