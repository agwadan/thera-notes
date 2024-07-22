import { Request, Response } from 'express';
import Journal from '../models/Journal';

export class JournalController {

  /* Method to Add New Journal
  -----------------------------------*/
  static async create(req: Request, res: Response) {
    const { title, content, category, date } = req.body;
    const userId = req.user!.id; 
    try {
      const journal = await Journal.create({ title, content, category, date, userId });
      res.status(201).json(journal);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /* Method to Get All Journals For A User
  ----------------------------------------- */
  static async getAll(req: Request, res: Response) {
    const userId = req.user!.id; 
    try {
      const journals = await Journal.findAll({ where: { userId } });
      res.json(journals);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

/* Method to Get One Journal By It's Id
----------------------------------------- */
  static async getById(req: Request, res: Response) {
  
    console.log('====================================');
    console.log(req.body);
    console.log(req.params);
    console.log('====================================');
    const { id } = req.params;
  
    try {
      const journal = await Journal.findByPk(id);
      if (!journal) {
        return res.status(404).json({ message: 'Journal entry not found' });
      }
      res.json(journal);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content, category, date } = req.body;
    try {
      const [updated] = await Journal.update(
        { title, content, category, date },
        { where: { id } }
      );
      if (updated) {
        const updatedJournal = await Journal.findByPk(id);
        res.json(updatedJournal);
      } else {
        res.status(404).json({ message: 'Journal entry not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleted = await Journal.destroy({ where: { id } });
      if (deleted) {
        res.json({ message: 'Journal entry deleted successfully' });
      } else {
        res.status(404).json({ message: 'Journal entry not found' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
