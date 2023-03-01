import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type PrivateRoutesTypes = {
  HomeScreen?: undefined;
  MovieDetailsScreen?: {
    movie_id?: any;
  };
  TvAction: {
    tv_id: any;
  };
};
export type PublicRoutesTypes = {
  LoginScreen?: undefined;
  SignUpScreen?: undefined;
};

export type PublicNavigationProps =
  NativeStackNavigationProp<PublicRoutesTypes>;
export type PrivateNavigationProps =
  NativeStackNavigationProp<PrivateRoutesTypes>;
