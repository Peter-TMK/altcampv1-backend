const router = require('express').Router();
const { verifyUser } = require('../../middleware/authenticate');
const validatorMiddleware = require('../../middleware/validator');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});
const {
  createAnswerValidator,
  getAnswerValidator,
  getAnswersValidator,
  updateAnswerValidator,
} = require('./answersValidator');
const answers = require('./answersController');

router.use(verifyUser);
router
  .route('/')
  .get(validator.query(getAnswersValidator), answers.getAnswers)
  .post(validatorMiddleware(createAnswerValidator), answers.createAnswer);

router.route('/upvote/:id').patch(answers.upvoteAnswer);

router.route('/downvote/:id').patch(answers.downvoteAnswer);

router
  .route('/:id')
  .get(validator.params(getAnswerValidator), answers.getAnswer)
  .patch(validatorMiddleware(updateAnswerValidator), answers.updateAnswer);

module.exports = router;
