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
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
//comment out 17 TEMPORARILY
router.route('/:userId').get(getUserById).put(createUser).delete(deleteUser);

export { router as userRouter} ;
