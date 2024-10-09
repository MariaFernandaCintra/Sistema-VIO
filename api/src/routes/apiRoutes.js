const router = require('express').Router()

const organizadorController = require('../controllers/organizadorController');
const userController = require("../controllers/userController")

router.post("/user", userController.createUser);
router.get("/user", userController.getAllUsers);
router.put("/user", userController.updateUser);
router.delete("/user/:cpf", userController.deleteUser);

router.post("/organizador", organizadorController.createOrganizador);
router.get("/organizador", organizadorController.getAllOrganizadores);
router.put("/organizador", organizadorController.updateOrganizador);
router.delete("/organizador/:id_organizador", organizadorController.deleteOrganizador);

module.exports = router