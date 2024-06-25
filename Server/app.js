const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes')
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productsRoutes = require('./routes/productsRoutes');
const productsPageRoutes = require('./routes/productsPageRoutes')
// require('dotenv').config();

app.get('/', (req, res) => { 
	res.send('A simple Node JS is '
		+ 'running on this server') 
	res.end() 
})
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/productsPage', productsPageRoutes);

const DB = "mongodb://mongoadmin:mongoadmin@localhost:27017/userdb?authSource=admin";

mongoose.connect(DB).then(() => {
	console.log('DB connection successful')
});


const PORT = 5000;
app.listen(PORT,console.log(
`Server started on port ${PORT}`));
