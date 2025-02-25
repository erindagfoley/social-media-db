import { Router } from 'express';
const router = Router();
import {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  // addAssignment, 8 and 9 commented out due to unnecessary routes in 19 and 22
  // removeAssignment,
} from '../../controllers/studentController.js';

// /api/students
router.route('/').get(getAllStudents).post(createStudent);

// /api/students/:studentId
//comment out 17 TEMPORARILY
// router.route('/:studentId').get(getStudentById).delete(deleteStudent);

// /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

export { router as studentRouter} ;
