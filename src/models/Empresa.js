const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const EmpresaSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    uf: String,
    thumbnail: String,
    description: String,
    vagas: {
        type: Number,
        default: 0
    }
},{
    toJSON: {
        virtuals: true,
    }
});

EmpresaSchema.virtual('thumbnail_url').get(function (){
    return `http://localhost:3333/files/${this.thumbnail}`;
});

EmpresaSchema.plugin(autoIncrement.plugin, {
    model: 'Empresa',
    field: 'profileId'
});

module.exports = mongoose.model('Empresa',EmpresaSchema);