import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';
import Icon from 'react-native-vector-icons/Ionicons';

registerScreens();
let openDrawerIcon;

export default class App {

    constructor () {
        this.populateIcons().then(() => {
            this.startApp();
        }).catch((error) => {
            console.error(error);
        });
    }

    populateIcons () {
        return new Promise(function (resolve, reject) {
            Promise.all(
                [
                    Icon.getImageSource('ios-menu', 30)
                ]
            ).then((values) => {
                openDrawerIcon = values[0]
                resolve(true);
            }).catch((error) => {
                console.log(error);
                reject(error);
            }).done();
        });
    }

    startApp () {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Main', // unique ID registered with Navigation.registerScreen
                title: 'Coffee Drive', // title of the screen as appears in the nav bar (optional)
                navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: openDrawerIcon, // for icon button, provide the local image asset name
                            id: 'openDrawer' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                        }
                    ]
                }
            },
            drawer: { // optional, add this if you want a side menu drawer in your app
                left: { // optional, define if you want a drawer from the left
                    screen: 'Drawer', // unique ID registered with Navigation.registerScreen
                    passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                },
                style: { // ( iOS only )
                    drawerShadow: false, // optional, add this if you want a side menu drawer shadow
                    contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
                    leftDrawerWidth: 70, // optional, add this if you want a define left drawer width (50=percent)
                },
                type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
                animationType: 'slide', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
                disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
            },
            passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
            animationType: 'none' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
        });
    }
}




