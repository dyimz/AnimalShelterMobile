const Adoption = require('../models/adoption');
const Animal = require('../models/animal');

const ErrorHandler = require('../utils/errorHandler');

exports.newAdopt = async (req, res, next) => {
    const {
        adoptionInfo,
        animalInfo,
        validationInfo

    } = req.body;

    const adoption = await Adoption.create({
        adoptionInfo,
        animalInfo,
        validationInfo,
        adoptedAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        adoption
    })
}

exports.updateAdoption = async (req, res, next) => {
    const adoption = await Adoption.findById(req.params.id)
    const animal = await adoption.animalInfo[0].animal
    // console.log(adoption)
    // console.log(animal)
    if (adoption.adoptStatus === 'Successful') {
        return next(new ErrorHandler('You have already approve this adoption', 400))
    }

    // const animal = await Animal.findById(animalInfo[0].id);
	// if(!animal) {
	//  		return res.status(404).json({
	//  			success: false,
	//  			message: 'Animal not found'
	//  		})
	//  }
	//  await animal.remove();
	//  res.status(200).json({
	//  	success: true,
	//  	message: 'Animal deleted'
	//  })

    adoption.adoptStatus = req.body.status,
        adoption.adoptedAt = Date.now()

    await adoption.save()

    res.status(200).json({
        success: true,
    })
}

exports.deleteAdoption = async (req, res, next) => {
    const adoption = await Adoption.findById(req.params.id)

    if (!adoption) {
        return next(new ErrorHandler('No Adoption found with this ID', 404))
    }

    await adoption.remove()

    res.status(200).json({
        success: true
    })
}

exports.getSingleAdoption = async (req, res, next) => {
    const adoption = await Adoption.findById(req.params.id).populate('user', 'name email')

    if (!adoption) {
        return next(new ErrorHandler('No Adoption found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        adoption
    })
}

exports.allAdoptions = async (req, res, next) => {
    const adoptions = await Adoption.find()
    // console.log(orders)

    res.status(200).json({
        success: true,
        adoptions
    })
}
