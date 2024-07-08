// src/controllers/journalController.ts
import { Request, Response } from 'express';
import JournalEntry from '../models/journal';
import { JournalRepository } from '../repositories/journalRepository';

const journalRepository = new JournalRepository();

export class JournalController {
  static async create(req: Request, res: Response) {
    const { title, content, category, date } = req.body;
    const userId = req.user!.id; // `!` tells TypeScript that `user` is defined
    try {
      const journal = new JournalEntry({ title, content, category, date, user: userId });
      await journalRepository.save(journal);
      res.status(201).json(journal);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  static async getAll(req: Request, res: Response) {
    const userId = req.user!.id;
    try {
      const entries = await journalRepository.findByUser(userId);
      res.json(entries);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const update = req.body;
    try {
      const updatedEntry = await journalRepository.findByIdAndUpdate(id, update);
      if (!updatedEntry) {
        return res.status(404).json({ message: 'Journal entry not found' });
      }
      res.json(updatedEntry);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedEntry = await journalRepository.findByIdAndDelete(id);
      if (!deletedEntry) {
        return res.status(404).json({ message: 'Journal entry not found' });
      }
      res.json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }
}
