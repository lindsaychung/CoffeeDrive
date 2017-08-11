import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';

registerScreens();

export default class App {

    constructor () {
        this.startApp()
    }

    startApp () {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Main', // unique ID registered with Navigation.registerScreen
                title: 'Coffee Drive', // title of the screen as appears in the nav bar (optional)
                navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            },
            drawer: { // optional, add this if you want a side menu drawer in your app
                left: { // optional, define if you want a drawer from the left
                    screen: 'Drawer', // unique ID registered with Navigation.registerScreen
                    passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                },
                style: { // ( iOS only )
                    drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                    contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
                    leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
                    rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
                },
                type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
                animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
                disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
            },
            passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
            animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
        });
    }
}




