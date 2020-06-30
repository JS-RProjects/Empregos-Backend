const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const VagaSchema = new mongoose.Schema({
    name: String,
    area: String,
    description: String,
    salario: Number,
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    thumbnail: {
        type: mongoose.Schema.Types.String,
        ref: 'Empresa'
    },
    profileid: {
        type: mongoose.Schema.Types.Number,
        ref: 'Empresa'
    },
    city: {
        type: mongoose.Schema.Types.String,
        ref: 'Empresa'
    },
    uf: {
        type: mongoose.Schema.Types.String,
        ref: 'Empresa'
    },
},{
    toJSON: {
        virtuals: true,
    }
});

VagaSchema.virtual('thumbnail_url').get(function (){
    return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Vaga',VagaSchema);