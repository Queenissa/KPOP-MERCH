const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connection = require('./services/database');
const path = require('path');

require('dotenv').config();
const port = 5000
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use('/public',express.static(path.join(__dirname, "public")))
connection.connect()

//user routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

//cart routes
const cartRoute = require('./routes/cartRoute');
app.use('/cart', cartRoute);

//product routes
const productRoutes = require('./routes/productRoutes');
app.use('/', productRoutes);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})
