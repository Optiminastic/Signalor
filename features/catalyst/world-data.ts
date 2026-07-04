export interface WorldMarker {
  country: string
  /** Geographic centroid — projected onto the map in WorldMap. */
  lat: number
  lon: number
  /** Share of sessions (%). */
  share: number
}

/**
 * Dummy world-presence data. Swap for Google Analytics `country` dimension
 * (sessions per country) — map each country's ISO code to a lat/lon once wired.
 */
export const WORLD_MARKERS: WorldMarker[] = [
  { country: 'United States', lat: 39, lon: -98, share: 34 },
  { country: 'India', lat: 22, lon: 79, share: 14 },
  { country: 'United Kingdom', lat: 54, lon: -2, share: 11 },
  { country: 'Brazil', lat: -10, lon: -52, share: 9 },
  { country: 'Germany', lat: 51, lon: 10, share: 9 },
  { country: 'Japan', lat: 37, lon: 138, share: 7 },
  { country: 'Canada', lat: 58, lon: -100, share: 6 },
  { country: 'Australia', lat: -25, lon: 134, share: 6 },
  { country: 'Nigeria', lat: 9, lon: 8, share: 4 },
]

export const WORLD_META = { countries: 48, sessions: '132.4K' }
