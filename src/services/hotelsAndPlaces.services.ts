import {
  GOOGLE_MAPS_API_BASE_URL,
  GOOGLE_MAPS_API_KEY,
  GOOGLE_PLACES_AUTOCOMPLETE_ENDPOINT,
  GOOGLE_PLACES_DETAILS_ENDPOINT,
} from "../utils/constants";
import HotelsData from "../jsonData/hotelsData.json";
import axios from "axios";
import { Hotel, SearchObj } from "../interfaces/hotelsAndPlaces.interface";
import { findMatchingIndices, isISubstring } from "../utils/helpers";

export const getNearbyPlaces = async (
  searchQuery: string
): Promise<SearchObj[]> => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: GOOGLE_MAPS_API_BASE_URL + GOOGLE_PLACES_AUTOCOMPLETE_ENDPOINT,
      params: {
        input: searchQuery,
        key: GOOGLE_MAPS_API_KEY,
      },
    });
    const formattedLocations = response.data.predictions.map(
      (location: { place_id: any; description: string }) => ({
        id: location.place_id,
        description: location.description,
        matchedSubstrings: findMatchingIndices(
          location.description,
          searchQuery
        ),
      })
    );
    return formattedLocations;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const getHotelsList = (searchQuery: string): SearchObj[] => {
  try {
    const searchedHotels = HotelsData.hotels.filter(
      (hotel) =>
        isISubstring(hotel.title, searchQuery) ||
        isISubstring(hotel.address, searchQuery)
    );
    const formattedHotels = searchedHotels.map((hotel) => {
      const { title, address, hotelID } = hotel;
      const description = `${title},${address}`;
      const matchedSubstrings = findMatchingIndices(description, searchQuery);
      return { id: hotelID, description, matchedSubstrings };
    });
    return formattedHotels;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const getPlaceDetails = async (placeId: string): Promise<Object> => {
  try {
    const response = await axios({
      url: GOOGLE_MAPS_API_BASE_URL + GOOGLE_PLACES_DETAILS_ENDPOINT,
      method: "GET",
      params: {
        place_id: placeId,
        key: GOOGLE_MAPS_API_KEY,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw new Error("Internal Server Error");
  }
};

export const getHotelById = (hotelId: string): Hotel => {
  try {
    const hotel = HotelsData.hotels.find((hotel) => hotel.hotelID === hotelId);
    return hotel;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};
