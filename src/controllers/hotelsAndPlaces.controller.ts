import { NextFunction, Request, Response } from "express";
import {
  getNearbyPlaces,
  getHotelsList,
  getHotelById,
  getPlaceDetails,
} from "../services/hotelsAndPlaces.services";

export const getList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query: searchQuery } = req.query;
    if (typeof searchQuery !== "string") {
      res
        .status(400)
        .json({ message: "TypeError: query must of type string!" });
      return;
    }
    res.json({
      locations: await getNearbyPlaces(searchQuery),
      hotels: getHotelsList(searchQuery),
    });
  } catch (err) {
    console.error(`Error while getting hotels and places`, err.message);
    next(err);
  }
};

export const getDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params;
    const { type, id } = params;
    if(type !== 'hotel' && type !== 'places') {
      res
        .status(400)
        .json({ message: "Invalid detail type in params!" });
      return;
    }
    if (type === "hotel") res.json({ data: getHotelById(id) });
    else res.json({ data: await getPlaceDetails(id) });
  } catch (err) {
    console.error(`Error while getting hotel or place details`, err.message);
    next(err);
  }
};
