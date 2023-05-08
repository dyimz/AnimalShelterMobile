const express = require('express')
const router = express.Router();

const { newAdopt,
    updateAdoption,
deleteAdoption,
getSingleAdoption,
allAdoptions
        
    } = require('../controllers/adoptionController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/adopt/new').post(isAuthenticatedUser, newAdopt);
router.route('/adoption/:id').get(isAuthenticatedUser, getSingleAdoption);
router.route('/admin/adoptions/').get(isAuthenticatedUser, allAdoptions);

router.route('/admin/adoption/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateAdoption).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteAdoption)

module.exports = router;