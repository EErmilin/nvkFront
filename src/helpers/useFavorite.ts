import {useMutation, useQuery} from '@apollo/client';
import {useCallback, useEffect, useState} from 'react';
import {
  CREATE_FAVORITE_SIMPLE,
  GET_FAVORITE,
} from '../gql/query/favorites/Favorites';
import {REMOVE_FAVORITE} from '../gql/mutation/favorite/RemoveFavorite';

export function useFavorite(where: {
  postId?: number;
  showId?: number;
  songId?: number;
  episodeId?: number;
  animationId?: number;
  movieId?: number;
  seriesId?: number;
}) {
  const [updating, setUpdating] = useState(false);
  const {data, refetch} = useQuery<{favorites: {id: number}[]}>(GET_FAVORITE, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
    variables: {where},
  });

  const [create] = useMutation(CREATE_FAVORITE_SIMPLE);
  const [remove] = useMutation(REMOVE_FAVORITE);

  const id = data?.favorites?.[0]?.id;
  const [isFavorite, setIsFavorite] = useState(!!id);

  const toggle = useCallback(async () => {
    if (updating) {
      return;
    }

    try {
      setUpdating(true);
      setIsFavorite(v => !v);
      if (id) {
        await remove({
          variables: {
            removeFavoriteId: id,
          },
        });
      } else {
        await create({
          variables: {
            data: {...where},
          },
        });
      }
      refetch();
    } finally {
      setUpdating(false);
    }
  }, [where, updating, id, refetch, create, remove]);

  useEffect(() => {
    setIsFavorite(!!id);
  }, [id]);

  return {isFavorite, toggle};
}
