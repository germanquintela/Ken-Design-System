/**
 * A solid #17332D data URL used as the `blurDataURL` for every `next/image`
 * with `placeholder="blur"`. Images here (doc heroes, banners) load in
 * milliseconds, but without a placeholder there's still a harsh blank → image
 * jump. Painting the brand green underneath first turns that jump into a soft
 * swap. The source SVG is just an 8×8 solid rect:
 *
 *   <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">
 *     <rect width="8" height="8" fill="#17332D"/>
 *   </svg>
 */
export const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxNzMzMkQiLz48L3N2Zz4=';
