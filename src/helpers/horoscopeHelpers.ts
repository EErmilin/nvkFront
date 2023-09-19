import {ZodiacType, IZodiacPeriod} from '../models/Horoscope';
//import {
//  Aquarius,
//  Aries,
//  Cancer,
//  Capricorn,
//  Gemini,
//  Libra,
//  Lion,
//  Pisces,
//  Sagittarius,
//  Scorpio,
//  Taurus,
//  Virgo,
//} from '../assets/img/zodiacs';

export const zodiacPeriods: IZodiacPeriod[] = [
  {
    id: 'Aries',
    name: 'Овен',
    period: '21 мар. - 19 апр.',
    value: 'Aries',
    afterValue: 'Taurus',
    beforeValue: 'Pisces',
  },
  {
    id: 'Taurus',
    name: 'Телец',
    period: '20 апр. - 20 мая.',
    value: 'Taurus',
    afterValue: 'Gemini',
    beforeValue: 'Aries',
  },
  {
    id: 'Gemini',
    name: 'Близнецы',
    period: '21 мая. - 22 июн.',
    value: 'Gemini',
    afterValue: 'Cancer',
    beforeValue: 'Taurus',
  },
  {
    id: 'Cancer',
    name: 'Рак',
    period: '21 июн. - 22 июл.',
    value: 'Cancer',
    afterValue: 'Lion',
    beforeValue: 'Gemini',
  },
  {
    id: 'Lion',
    name: 'Лев',
    period: '23 июл. - 22 авг.',
    value: 'Lion',
    afterValue: 'Virgo',
    beforeValue: 'Cancer',
  },
  {
    id: 'Virgo',
    name: 'Дева',
    period: '23 авг. - 22 сен.',
    value: 'Virgo',
    afterValue: 'Libra',
    beforeValue: 'Lion',
  },
  {
    id: 'Libra',
    name: 'Весы',
    period: '23 сен. - 22 окт.',
    value: 'Libra',
    afterValue: 'Scorpio',
    beforeValue: 'Virgo',
  },
  {
    id: 'Scorpio',
    name: 'Скорпион',
    period: '23 окт. - 21 ноя.',
    value: 'Scorpio',
    afterValue: 'Sagittarius',
    beforeValue: 'Libra',
  },
  {
    id: 'Sagittarius',
    name: 'Стрелец',
    period: '22 ноя. - 21 дек.',
    value: 'Sagittarius',
    afterValue: 'Capricorn',
    beforeValue: 'Scorpio',
  },
  {
    id: 'Capricorn',
    name: 'Козерог',
    period: '22 дек. - 19 янв.',
    value: 'Capricorn',
    afterValue: 'Aquarius',
    beforeValue: 'Sagittarius',
  },
  {
    id: 'Aquarius',
    name: 'Водолей',
    period: '20 янв. - 18 фев.',
    value: 'Aquarius',
    afterValue: 'Pisces',
    beforeValue: 'Capricorn',
  },
  {
    id: 'Pisces',
    name: 'Рыбы',
    period: '19 фев. - 20 мар.',
    value: 'Pisces',
    afterValue: 'Aries',
    beforeValue: 'Aquarius',
  },
];

//export const horoscopeAvatar = (zodiac: ZodiacType) => {
//  switch (zodiac) {
//    case 'Aquarius':
//      return Aquarius();
//    case 'Aries':
//      return Aries();
//    case 'Cancer':
//      return Cancer();
//    case 'Capricorn':
//      return Capricorn();
//    case 'Gemini':
//      return Gemini();
//    case 'Libra':
//      return Libra();
//    case 'Lion':
//      return Lion();
//    case 'Pisces':
//      return Pisces();
//    case 'Sagittarius':
//      return Sagittarius();
//    case 'Scorpio':
//      return Scorpio();
//    case 'Taurus':
//      return Taurus();
//    case 'Virgo':
//      return Virgo();
//  }
//};

export const horoscopeName = (zodiac: ZodiacType) => {
  switch (zodiac) {
    case 'Aquarius':
      return 'Водолей';
    case 'Aries':
      return 'Овен';
    case 'Cancer':
      return 'Рак';
    case 'Capricorn':
      return 'Козерог';
    case 'Gemini':
      return 'Близнецы';
    case 'Libra':
      return 'Весы';
    case 'Lion':
      return 'Лев';
    case 'Pisces':
      return 'Рыбы';
    case 'Sagittarius':
      return 'Стрелец';
    case 'Scorpio':
      return 'Скорпион';
    case 'Taurus':
      return 'Телец';
    case 'Virgo':
      return 'Дева';
  }
};

export const zodiacNameFind = (day = 31, month = 3) => {
  if (day && month) {
    switch (month) {
      case 0:
        if (day <= 20) {
          return 'Capricorn';
        } else {
          return 'Aquarius';
        }
      case 1:
        if (day <= 19) {
          return 'Aquarius';
        } else {
          return 'Pisces';
        }
      case 2:
        if (day <= 20) {
          return 'Pisces';
        } else {
          return 'Aries';
        }
      case 3:
        if (day <= 20) {
          return 'Aries';
        } else {
          return 'Taurus';
        }
      case 4:
        if (day <= 21) {
          return 'Taurus';
        } else {
          return 'Gemini';
        }
      case 5:
        if (day <= 21) {
          return 'Gemini';
        } else {
          return 'Cancer';
        }
      case 6:
        if (day <= 22) {
          return 'Cancer';
        } else {
          return 'Lion';
        }
      case 7:
        if (day <= 21) {
          return 'Lion';
        } else {
          return 'Virgo';
        }
      case 8:
        if (day <= 23) {
          return 'Virgo';
        } else {
          return 'Libra';
        }
      case 9:
        if (day <= 23) {
          return 'Libra';
        } else {
          return 'Scorpio';
        }
      case 10:
        if (day <= 22) {
          return 'Scorpio';
        } else {
          return 'Sagittarius';
        }
      case 11:
        if (day <= 22) {
          return 'Sagittarius';
        } else {
          return 'Capricorn';
        }
      default:
        return 'Aries';
    }
  }
  return 'Aries';
};
