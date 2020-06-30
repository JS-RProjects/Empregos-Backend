const Empresa = require('../models/Empresa');

module.exports = {
    async index(req,res){
        const { empresa_link } = req.params;
        const { empresa_id } = req.headers;

        const empresa = await Empresa.findOne({
            profileId: empresa_link
        });

        if (!empresa){
            return res.status(404).json({ error: 'Profile not found!' });
        }

        return res.json(empresa);
    },

    async show(req,res){
        const { email,password } = req.body;

        const empresa = await Empresa.findOne({
            email,
            password
        });

        if (!empresa){
            return res.status(400).json({ error: "Email/Password invalid!"});
        }

        return res.json(empresa);
    },

    async store(req,res){
        const { filename } = req.file;
        const { name,email,password,city,uf,description } = req.body;
        
        let empresa = await Empresa.findOne({email});

        if (empresa){
            return res.status(400).json({ error: 'Email alredy in use'});
        }

        empresa = await Empresa.create({
            thumbnail: filename,
            name,
            email,
            password,
            city,
            uf,
            description
        }); 

        return res.json(empresa);
    }
};