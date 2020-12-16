const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const env = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 2000;
const { MONGOURI } = require("./config/keys.js");
 
mongoose.connect(MONGOURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
})
.then(console.log('connected to db!'));

//routes
const userRoutes = require('./src/routes/user.js');
const adminRoutes = require('./src/routes/admin/user.js');
const catagoryRoutes = require('./src/routes/catagory.js'); 
const productRoutes = require('./src/routes/product.js'); 
const cartRoutes = require('./src/routes/cart.js');
const initialDataRoutes = require('./src/routes/admin/initialData.js');
const filterRoutes = require('./src/routes/filter.js');


app.use(cors());
app.use(bodyParser()); 
app.use(express.json()); 
app.use('/public', express.static(path.join(__dirname, 'src/uploads')));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', catagoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', filterRoutes);  


if(process.env.NODE_ENV == "production"){
  app.use(express.static('client_user/build'))
  const path = require('path')
  app.get('*', (req, res)=>{
      res.sendFile(path.resolve(__dirname,'client_user', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server Has Started!`);
}); 


