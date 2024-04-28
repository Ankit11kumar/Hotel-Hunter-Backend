export interface Hotel {
  title: string;
  address: string;
  hotelID: string;
  description: string;
}

export interface SearchObj {
  id: string;
  description: string;
  matchedSubstrings: any[]
}