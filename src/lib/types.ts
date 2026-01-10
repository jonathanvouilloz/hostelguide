// ============================================
// Settings Types
// ============================================

export interface WiFiSettings {
  name: string;
  password: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface Settings {
  hostelName: string;
  logo: string;
  primaryColor: string;
  accentColor: string;
  wifi: WiFiSettings;
  checkIn: string;
  checkOut: string;
  contactWhatsApp: string;
  emergencyContacts: EmergencyContact[];
  timezone: string;
}

// ============================================
// Spot Types
// ============================================

export interface Coordinates {
  lat: number;
  lng: number;
}

export type CuisineType =
  | 'thai'
  | 'western'
  | 'japanese'
  | 'chinese'
  | 'indian'
  | 'italian'
  | 'mexican'
  | 'korean'
  | 'vietnamese'
  | 'vegetarian'
  | 'vegan'
  | 'seafood'
  | 'street-food'
  | 'cafe'
  | 'other';

export type PriceRange = '€' | '€€' | '€€€';

export interface Spot {
  id: string;
  name: string;
  description: string;
  cuisineType?: CuisineType;
  priceRange?: PriceRange;
  image?: string;
  address?: string;
  coordinates?: Coordinates;
  location?: Coordinates; // Alias for PagesCMS compatibility
  phone?: string;
  openingHours?: string;
  tags?: string[];
}

export interface SpotsFile {
  spots: Spot[];
}

export type SpotCategory = 'restaurants' | 'laundry' | 'transport' | 'bars' | 'activities';

// ============================================
// Event Types
// ============================================

export type CTAType = 'whatsapp' | 'link';

export interface EventCTA {
  type: CTAType;
  label: string;
  url: string;
  message?: string;
}

export interface HostelEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  price: string | null;
  cta: EventCTA | null;
}

export interface EventsFile {
  events: HostelEvent[];
}

// ============================================
// Category Metadata
// ============================================

export interface CategoryMeta {
  slug: SpotCategory;
  name: string;
  emoji: string;
  description: string;
}
