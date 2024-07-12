import { Router } from 'express';
import { JournalController } from '../controllers/journalController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, JournalController.create);
router.get('/', authMiddleware, JournalController.getAll);
router.get('/:id', authMiddleware, JournalController.getById);
router.put('/:id', authMiddleware, JournalController.update);
router.delete('/:id', authMiddleware, JournalController.delete);

export default router;
