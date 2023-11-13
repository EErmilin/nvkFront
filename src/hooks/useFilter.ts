import {useMemo} from 'react';
import {FilterType, MainFilter} from '../gql/query/filters/filters';
import {useAppSelector} from '../redux/hooks';

export function useFilter(filters) {

  return useMemo<MainFilter | null>(() => {

    const mainFilter: MainFilter = {
      kinopoiskRating: filters.rating,
    };

    if (filters['genre']?.length) {
      mainFilter.genre = filters['genre'];
    }

    if (filters['language']?.length) {
      mainFilter.language = filters['language'];
    }

    if (filters['country']?.length) {
      mainFilter.country = filters['country'];
    }

    if (filters['age']?.length) {
      mainFilter.age = filters['age'];
    }

    if (filters['year']?.length) {
      mainFilter.year = filters['year'].map(Number);
    }

    console.log(JSON.stringify(mainFilter));

    return mainFilter;
  }, [filters]);
}
