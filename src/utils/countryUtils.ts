import { FlagComponent } from 'country-flag-icons/react/3x2';
import * as flags from 'country-flag-icons/react/3x2';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

// Initialize the language data
countries.registerLocale(en);

export function getCountryFlag(country: string, city?: string): FlagComponent {
  // Special case for Hong Kong
  if (country === 'China' && city === 'Hong Kong') {
    return flags.HK;
  }

  const code = countries.getAlpha2Code(country, 'en') as keyof typeof flags;
  return code ? flags[code] : flags.UN; // Fallback to UN flag if country not found
}