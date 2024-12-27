import { Response } from 'express';
import Note, { INote } from '../models/note';
import { AuthenticatedRequest } from '../types';

// Get all notes
export const getNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || !req.user._id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        const notes = await Note.find({ user: req.user._id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
    }
};

// Create a new note
export const createNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { title, content, category } = req.body;

        if (!title || !category) {
            res.status(400).json({ message: 'Title and category are required' });
            return;
        }

        if (!req.user || !req.user._id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        const note = await Note.create({
            user: req.user._id,
            title,
            content,
            category,
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error });
    }
};

// Update an existing note
export const updateNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;

        if (!req.user || !req.user._id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        const note = await Note.findOne({ _id: id, user: req.user._id });

        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }

        note.title = title || note.title;
        note.content = content || note.content;
        note.category = category || note.category;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error });
    }
};

// Delete a note
 export const deleteNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!req.user || !req.user._id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });

        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error });
    }
};