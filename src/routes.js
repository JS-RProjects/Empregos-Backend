const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

const UsuarioController = require('./controllers/UsuarioController');
const EmpresaController = require('./controllers/EmpresaController');
const VagaController = require('./controllers/VagaController');

routes.post('/pessoa/create',upload.single('thumbnail'),UsuarioController.store);
routes.post('/pessoa/login',UsuarioController.show)
routes.get('/pessoa/:profile_link',UsuarioController.index);

routes.post('/empresa/create',upload.single('thumbnail'),EmpresaController.store);
routes.post('/empresa/login',EmpresaController.show);
routes.get('/empresa/:empresa_link',EmpresaController.index);

routes.get('/vagas',VagaController.index)
routes.post('/vagas/new',VagaController.store);
routes.delete('/vagas/del/:id',VagaController.delete);

module.exports = routes;