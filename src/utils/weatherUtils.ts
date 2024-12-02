import { Cloud, CloudRain, Sun, CloudFog, CloudDrizzle, Snowflake } from 'lucide-react';

export function getWeatherIcon(condition: string) {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return Sun;
    case 'rainy':
    case 'rain':
      return CloudRain;
    case 'cloudy':
    case 'overcast':
      return Cloud;
    case 'foggy':
    case 'mist':
      return CloudFog;
    case 'drizzle':
      return CloudDrizzle;
    case 'snow':
    case 'snowy':
      return Snowflake;
    default:
      return Cloud;
  }
}