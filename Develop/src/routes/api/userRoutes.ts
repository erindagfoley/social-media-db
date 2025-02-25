import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  // addAssignment, 8 and 9 commented out due to unnecessary routes in 19 and 22
  // removeAssignment,
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUsers);

// /api/students/:studentId
//comment out 17 TEMPORARILY
// router.route('/:userId').get(getUserById).delete(deleteUser);

// /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

export { router as userRouter} ;
