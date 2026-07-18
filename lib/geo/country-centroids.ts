/**
 * ISO 3166-1 alpha-2 → approximate geographic centroid.
 *
 * GA4 reports traffic by `countryId` (alpha-2); the world map needs a point to
 * plot. Coordinates are coarse country centroids — good enough for a dot on a
 * 48x22 equirectangular grid, not for cartography.
 *
 * Not exhaustive: a country missing here simply gets no map dot. It still counts
 * toward totals and can still rank in Top markets, so an unknown code degrades a
 * marker rather than dropping the session.
 */
export interface Centroid {
  lat: number
  lon: number
}

export const COUNTRY_CENTROIDS: Record<string, Centroid> = {
  AE: { lat: 24, lon: 54 },
  AR: { lat: -34, lon: -64 },
  AT: { lat: 47.5, lon: 14 },
  AU: { lat: -25, lon: 134 },
  BD: { lat: 24, lon: 90 },
  BE: { lat: 50.8, lon: 4.5 },
  BG: { lat: 43, lon: 25 },
  BR: { lat: -10, lon: -52 },
  CA: { lat: 58, lon: -100 },
  CH: { lat: 47, lon: 8 },
  CL: { lat: -33, lon: -71 },
  CN: { lat: 35, lon: 105 },
  CO: { lat: 4, lon: -73 },
  CZ: { lat: 49.8, lon: 15.5 },
  DE: { lat: 51, lon: 10 },
  DK: { lat: 56, lon: 10 },
  EG: { lat: 27, lon: 30 },
  ES: { lat: 40, lon: -4 },
  FI: { lat: 64, lon: 26 },
  FR: { lat: 46, lon: 2 },
  GB: { lat: 54, lon: -2 },
  GH: { lat: 8, lon: -1 },
  GR: { lat: 39, lon: 22 },
  HK: { lat: 22.3, lon: 114.2 },
  HR: { lat: 45.1, lon: 15.2 },
  HU: { lat: 47, lon: 20 },
  ID: { lat: -5, lon: 120 },
  IE: { lat: 53, lon: -8 },
  IL: { lat: 31.5, lon: 34.8 },
  IN: { lat: 22, lon: 79 },
  IQ: { lat: 33, lon: 44 },
  IT: { lat: 42.8, lon: 12.8 },
  JP: { lat: 37, lon: 138 },
  KE: { lat: 1, lon: 38 },
  KR: { lat: 36.5, lon: 128 },
  LK: { lat: 7, lon: 81 },
  MA: { lat: 32, lon: -6 },
  MX: { lat: 23, lon: -102 },
  MY: { lat: 4, lon: 102 },
  NG: { lat: 9, lon: 8 },
  NL: { lat: 52.2, lon: 5.5 },
  NO: { lat: 62, lon: 10 },
  NZ: { lat: -41, lon: 174 },
  PE: { lat: -10, lon: -76 },
  PH: { lat: 13, lon: 122 },
  PK: { lat: 30, lon: 70 },
  PL: { lat: 52, lon: 19 },
  PT: { lat: 39.5, lon: -8 },
  RO: { lat: 46, lon: 25 },
  RS: { lat: 44, lon: 21 },
  RU: { lat: 60, lon: 90 },
  SA: { lat: 24, lon: 45 },
  SE: { lat: 62, lon: 15 },
  SG: { lat: 1.35, lon: 103.8 },
  TH: { lat: 15, lon: 101 },
  TR: { lat: 39, lon: 35 },
  TW: { lat: 23.7, lon: 121 },
  UA: { lat: 49, lon: 32 },
  US: { lat: 39, lon: -98 },
  VN: { lat: 16, lon: 106 },
  ZA: { lat: -29, lon: 24 },
}

export function centroidFor(countryId: string): Centroid | undefined {
  return COUNTRY_CENTROIDS[countryId?.toUpperCase()]
}
