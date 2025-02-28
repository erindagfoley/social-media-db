import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} from '../../controllers/thoughtController.js';

// /api/courses
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getAllThoughts)
  .get(getThoughtById)
  .put(createThought)
  .put(updateThought)
  .delete(deleteThought);

export { router as thoughtRouter };
