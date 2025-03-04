const router = require('express').Router();
const { verifyUser } = require('../../middleware/authenticate');
const validatorMiddleware = require('../../middleware/validator');
const {
  passwordValidator,
  profileValidator,
} = require('../accounts/accountsValidator');
const {
  getMentors,
  getSingleMentor,
  updateMentor,
  changeMentorPassword,
} = require('./mentorsController');

router.route('/').get(getMentors);
router.route('/:id').get(getSingleMentor);

router.use(verifyUser);
router
  .route('/change-password')
  .put(validatorMiddleware(passwordValidator), changeMentorPassword);
router
  .route('/update-profile')
  .put(validatorMiddleware(profileValidator), updateMentor);

module.exports = router;
