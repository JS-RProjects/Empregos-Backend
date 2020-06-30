const Usuario = require('../models/Usuario');

module.exports = {
    async index(req,res){
        const { profile_link } = req.params;
        const { pessoa_id } = req.headers;

        const user = await Usuario.findOne({
            profileId: profile_link
        });

        if (!user){
            return res.status(404).json({ error: 'Profile not found!' });
        }

        return res.json(user);
    },

    async show(req,res){
        const { email,password } = req.body;

        const user = await Usuario.findOne({
            email,
            password
        });

        if (!user){
            return res.status(400).json({ error: "Email/Password invalid!"});
        }

        return res.json(user);
    },

    async store(req,res){
        const { filename } = req.file;
        const { name,email,password,city,uf,description } = req.body;
        
        let user = await Usuario.findOne({email});

        if (user){
            return res.status(400).json({ error: 'Email alredy in use'});
        }

        user = await Usuario.create({
            thumbnail: filename,
            name,
            email,
            password,
            city,
            uf,
            description
        }); 

        return res.json(user);
    }
};