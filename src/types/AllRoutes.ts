import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type PrivateRoutesTypes = {
  MovieDetailsScreen?: {
    movie_id?: any;
  };
  TvAction: {
    tv_id: any;
  };
  BottomTabs: undefined;
};
export type PublicRoutesTypes = {
  LoginScreen?: undefined;
  SignUpScreen?: undefined;
};
export type BottomTabType = {
  HomeScreen?: undefined;
  FavoriteScreen?: undefined;
  MyList?: undefined;
};

export type PublicNavigationProps =
  NativeStackNavigationProp<PublicRoutesTypes>;
export type PrivateNavigationProps =
  NativeStackNavigationProp<PrivateRoutesTypes>;
export type StackAndTabType = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabType>,
  NativeStackNavigationProp<PrivateRoutesTypes>
>;
