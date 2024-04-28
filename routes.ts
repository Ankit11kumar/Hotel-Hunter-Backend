import { Router } from 'express';
import hotelsAndPlaces from "./src/routes/hotelsAndPlaces.routes";

const router = Router();

router.use('/hotels-and-places', hotelsAndPlaces);

export default router;
