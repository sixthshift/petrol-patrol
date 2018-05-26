import { createStackNavigator } from 'react-navigation';

import FavouritesScreen from '../screens/FavouritesScreen';

const FavouritesNavigator = createStackNavigator(
    {
        Favourites: { screen: FavouritesScreen }
    }
);

export default FavouritesNavigator;