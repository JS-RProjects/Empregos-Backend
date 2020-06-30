const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const UsuarioSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    uf: String,
    thumbnail: String,
    description: String,
},{
    toJSON: {
        virtuals: true,
    }
});

UsuarioSchema.virtual('thumbnail_url').get(function (){
    return `https://empregos.herokuapp.com/files/${this.thumbnail}`;
});

UsuarioSchema.plugin(autoIncrement.plugin, {
    model: 'Usuario',
    field: 'profileId'
});

module.exports = mongoose.model('Usuario',UsuarioSchema);