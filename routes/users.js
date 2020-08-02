const {new: _new, create} = require('../controllers/UsersController')

module.exports  = router => {
    router.use('/', () => console.log("users route"));
    router.get('/register', _new);
    router.post('/users', create);
};