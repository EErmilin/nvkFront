export type ZodiacType =
  | 'Aquarius'
  | 'Aries'
  | 'Cancer'
  | 'Capricorn'
  | 'Gemini'
  | 'Libra'
  | 'Lion'
  | 'Pisces'
  | 'Sagittarius'
  | 'Scorpio'
  | 'Taurus'
  | 'Virgo';

export interface IHoroscopeType {
  name: string;
  horoscopes: IHoroscope[];
}

export interface IHoroscope {
  content: string;
  id: number;
}

export interface IZodiacPeriod {
  id: ZodiacType;
  name: string;
  period: string;
  value: ZodiacType;
  beforeValue: ZodiacType;
  afterValue: ZodiacType;
}
