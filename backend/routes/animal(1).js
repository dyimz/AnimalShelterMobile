const express = require('express');
const router = express.Router();

const { getAnimals,
    newAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimalDetails,
    getAdminAnimals,
    createAnimalReview

    
 } = require('../controllers/animalController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Home page
router.route('/animals').get(getAnimals);

// Comment
router.route('/comment').put(isAuthenticatedUser, createAnimalReview);

// Admin 
router.route('/admin/animals').get(getAdminAnimals);
router.route('/admin/animal/new').post(newAnimal);
router.route('/admin/animal/:id').get(getAnimalDetails).put(updateAnimal).delete(deleteAnimal);


module.exports = router;