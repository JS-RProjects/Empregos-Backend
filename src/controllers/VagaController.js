const Vaga = require('../models/Vaga');
const Empresa = require('../models/Empresa');

module.exports = {
    async index(req,res){
        let { area,city,uf,profileid, salario_min } = req.headers;
        if (!salario_min){
            salario_min = 0;
        }

        try{
            const vagas = await Vaga.find({
                area: area ? area : {$ne: null},
                city: city ? city : {$ne: null},
                uf: uf ? uf : {$ne: null},
                profileid: profileid ? profileid : {$ne: null},
                salario: {$gte: salario_min}
            });

            return res.json(vagas);
        } catch {
            return res.status(400).json({ erro: 'Value invalid' });
        }

    },

    async store(req,res){
        const { name,area,description,salario } = req.body;
        const { empresa_id,thumbnail,city,uf } = req.headers;

        let profileid = await Empresa.findOne({
            _id: empresa_id
        });

        profileid = profileid.profileId;

        const vaga = await Vaga.create({
            empresa: empresa_id,
            name,
            area,
            description,
            profileid,
            thumbnail,
            city,
            uf,
            salario,
        });

        const empresa = await Empresa.findById(empresa_id);
        let vagas = empresa.vagas;
        console.log(empresa.vagas);

        vagas = vagas + 1
        

        await Empresa.findOneAndUpdate({ _id: empresa_id }, { vagas: vagas })

        return res.json(vaga);
    },

    async delete(req,res){
        const { id } = req.params;
        const { empresa_id } = req.headers;
        let result;

        try {
            result = await Vaga.findOneAndDelete({
                _id: id,
                empresa: empresa_id
            });
        } catch {
            return res.status(400).json({ error: 'ID invalid!' });
        }

        if (result){
            return res.json(result);
        } else {
            return res.status(400).json({ error: 'ID Not found/Enterprise ID invalid!' });
        }
    }
};