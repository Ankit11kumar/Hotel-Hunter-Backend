export interface Hotel {
  title: string;
  address: string;
  hotelID: string;
  description: string;
}

export interface MatchedSubstrings {
  length: number;
  offset: number;
}

export interface SearchObj {
  id: string;
  description: string;
  matchedSubstrings: MatchedSubstrings[];
}
