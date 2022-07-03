const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
const sendTokenResponse = require('../utils/sendTokenResponse')
const advancedResults = require('../middleware/advancedResults')

// // @desc    Get all users
// // @route   GET /api/v1/auth/users
// // @access  Private/Admin
// exports.getUsers = asyncHandler(async (req, res, next) => {
//     const users = await User.find();

//     res.status(200).json(res.advancedResults);
// });

// // @desc    Get a single user
// // @route   GET /api/v1/auth/users/:id
// // @access  Private/Admin
// exports.getUser = asyncHandler(async (req, res, next) => {
//     const user = await User.findById(req.params.id);

//     res.status(200).json({
//         success: true,
//         data: user,
//     });
// });
// // @desc    Create new user
// // @route   POST /api/v1/users
// // @access  Private/Admin
// exports.createUser = asyncHandler(async (req, res, next) => {
//     const user = await User.create(req.body);

//     res.status(201).json({
//         success: true,
//         data: user,
//     });
// });

// // @desc    Update user
// // @route   PUT /api/v1/users/:id
// // @access  Private/Admin
// exports.updateUser = asyncHandler(async (req, res, next) => {
//     let user = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     res.status(200).json({ success: true, data: user });
// });

// // @desc    Delete user
// // @route   DELETE /api/v1/users/:id
// // @access  Private/Admin
// exports.deleteUser = asyncHandler(async (req, res, next) => {
//     await User.findByIdAndDelete(req.params.id);

//     res.status(200).json({ success: true, data: {} });
// });

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    email: req.body.email,
  }

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorect', 401))
  }

  user.password = req.body.newPassword
  await user.save()

  sendTokenResponse(user, 200, res)
})
