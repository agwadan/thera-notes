import { Router } from 'express';
import { JournalController } from '../controllers/journalController';
import { authenticateJWT } from '../middleware/authenticateJWT';

const router = Router();

router.post('/', authenticateJWT, JournalController.create);
router.get('/', authenticateJWT, JournalController.getAll);
router.put('/:id', authenticateJWT, JournalController.update);
router.delete('/:id', authenticateJWT, JournalController.delete);

export default router;
