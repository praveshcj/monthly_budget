var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var userSchema = Schema({
    emailid: {type: String, required: true}, 
    firstname: {type: String, required: true}, 
    lastname: {type: String, required: true}, 
    dob: {type: Date, required: true},
    salt: {type: String, required: true}, 
    phash: {type: String, required: true},
    defaultcurreny: {
        type: String,
        enum: ['USD', 'INR'],
        default: 'INR'
    }
});


var expenseSchema = Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User', required : true},
    expenseamount: {type: Number, required: true},
    expensetype:{
        type:String, 
        enum: ['Food', 'Investment', 'Personal','Travelling', 'Accessories', 'Others']
    },
    expensecurrency: {
        type: String, 
        enum: ['USD','INR']
    },
    expensedate:{
        type: Date, 
        default: Date.now()
    },

});


exports.user = mongoose.model('User', userSchema)
exports.expense = mongoose.model('Expense', expenseSchema);