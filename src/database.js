const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finterest_tutorial',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then(db=>console.log('DB is Connected'))
    .catch(err=>console.log(err));

module.exports=mongoose;