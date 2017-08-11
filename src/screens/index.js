/**
 * Created by leonardean on 11/08/2017.
 */
import { Navigation } from 'react-native-navigation';
import Drawer from './pages/Drawer';
import Main from './pages/Main';
import Authentication from './pages/Authentication';
import Tabs from './partials/common/Tabs';

export function registerScreens() {
    Navigation.registerComponent('Main', () => Main);
    Navigation.registerComponent('Drawer', () => Drawer);
    Navigation.registerComponent('Authentication', () => Authentication);
    Navigation.registerComponent('Tabs', () => Tabs);
}