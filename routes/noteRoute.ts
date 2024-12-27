import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controller/noteController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Routes for notes
router.route('/')
    .get(protect, getNotes)  
    .post(protect, createNote); // Create a new note

router.route('/:id')
    .put(protect, updateNote)  // Update an existing note
    .delete(protect, deleteNote); // Delete a note

export default router;