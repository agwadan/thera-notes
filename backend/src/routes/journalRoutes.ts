import { Router } from 'express';
import { JournalController } from '../controllers/journalController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.post('/', JournalController.create);
router.get('/', JournalController.getAll);
router.get('/:id', JournalController.getById);
router.put('/:id', JournalController.update);
router.delete('/:id', JournalController.delete);

export default router;
