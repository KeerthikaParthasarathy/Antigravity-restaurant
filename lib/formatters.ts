export const RESTAURANT_CONFIG = {
  name: "Anti-Gravity — The Royal Fire",
  tagline: "The Art of Fire. The Soul of Heritage.",
  currencyCode: "USD",
  currencySymbol: "$",
  timeZone: "America/New_York", // or Asia/Kolkata
  address: "482 Royal Obsidian Way, Fire District, NY 10013",
  phone: "+1 (212) 890-FIRE",
  email: "concierge@royalfire.dining",
  hours: {
    tuesdayToThursday: "5:30 PM — 11:30 PM",
    fridayToSunday: "5:00 PM — 1:00 AM",
    monday: "Closed for Private Banquets",
  },
  seatingIntervalMinutes: 30,
};

export function formatPrice(amountInDollars: number): string {
  return `${RESTAURANT_CONFIG.currencySymbol}${amountInDollars.toFixed(2)}`;
}

export function formatPriceWithoutDecimals(amountInDollars: number): string {
  return `${RESTAURANT_CONFIG.currencySymbol}${Math.round(amountInDollars)}`;
}

export function formatRestaurantTime(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: RESTAURANT_CONFIG.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).format(date);
  } catch {
    return date.toLocaleTimeString();
  }
}

export function formatRestaurantDate(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: RESTAURANT_CONFIG.timeZone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return date.toDateString();
  }
}
