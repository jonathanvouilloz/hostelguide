/**
 * Geolocation utilities for PWA
 * Calculates distance between user and spots
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Calculate distance between two points using Haversine formula
 * @returns Distance in meters
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Format distance for display
 * @param meters Distance in meters
 * @returns Formatted string like "200m" or "1.2km"
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

/**
 * Get user's current position
 * @returns Promise with coordinates or null if denied/unavailable
 */
export function getUserLocation(): Promise<Coordinates | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  });
}

/**
 * Initialize distance display for all elements with data-lat and data-lng attributes
 *
 * Usage in HTML:
 * - Add class "distance-display" to the element that will show the distance
 * - Add data-lat and data-lng attributes with coordinates
 * - Optionally add class "distance-separator" to a sibling element (will be shown when distance is available)
 *
 * @example
 * <span class="distance-separator hidden">•</span>
 * <span class="distance-display hidden" data-lat="18.8023" data-lng="98.9678"></span>
 */
export async function initDistanceDisplay(): Promise<void> {
  const userLocation = await getUserLocation();
  if (!userLocation) return;

  // Find all elements with distance-display class
  const distanceElements = document.querySelectorAll('.distance-display[data-lat][data-lng]');

  distanceElements.forEach((el) => {
    const spotLat = parseFloat(el.getAttribute('data-lat') || '0');
    const spotLng = parseFloat(el.getAttribute('data-lng') || '0');

    if (spotLat && spotLng) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        spotLat,
        spotLng
      );
      const formatted = formatDistance(distance);

      // Update the distance element
      el.textContent = formatted;
      el.classList.remove('hidden');

      // Show separator if exists (previous sibling with distance-separator class)
      const separator = el.previousElementSibling;
      if (separator?.classList.contains('distance-separator')) {
        separator.classList.remove('hidden');
      }
    }
  });

  // Also update distance badges on cards (for list pages)
  const badgeElements = document.querySelectorAll('.distance-badge[data-lat][data-lng]');

  badgeElements.forEach((badge) => {
    const spotLat = parseFloat(badge.getAttribute('data-lat') || '0');
    const spotLng = parseFloat(badge.getAttribute('data-lng') || '0');

    if (spotLat && spotLng) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        spotLat,
        spotLng
      );
      const formatted = formatDistance(distance);

      // Update badge value
      const valueEl = badge.querySelector('.distance-value');
      if (valueEl) {
        valueEl.textContent = formatted;
      }
      badge.classList.remove('hidden');

      // Update footer distance text if exists
      const card = badge.closest('.spot-card');
      if (card) {
        const textEl = card.querySelector('.distance-text');
        const textValueEl = card.querySelector('.distance-value-text');
        if (textEl && textValueEl) {
          textValueEl.textContent = `${formatted} walk`;
          textEl.classList.remove('hidden');
        }
      }
    }
  });
}
