import { Router } from 'express';
import { getDetails, getList } from '../controllers/hotelsAndPlaces.controller';

const router = Router();

/**
 * GET list of places and hotels based on search query
 */
router.get('/search', getList)

/**
 * GET hotel or place details
 */
router.get('/:type/:id', getDetails);

export default router;