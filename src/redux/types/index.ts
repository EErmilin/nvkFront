import {AuthTypes} from './AuthTypes';
import {UserTypes} from './UserTypes';
import {IPostState} from './PostTypes';
import {IThemeState} from './ThemeTypes';
import {IFavoriteState} from './FavoriteTypes';
import {MainStateTypes} from './MainTypes';
import {CreatePostType} from './CreatePostTypes';

export interface RootInterface {
  auth: AuthTypes;
  user: UserTypes;
  post: IPostState;
  theme: IThemeState;
  favorite: IFavoriteState;
  main: MainStateTypes;
  createPost: CreatePostType;
}
