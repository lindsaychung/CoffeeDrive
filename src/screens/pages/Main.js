/**
 * Created by leonardean on 11/08/2017.
 */
import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Alert} from 'react-native';
import Global from '../../Global';
import Tabs from '../partials/common/Tabs'
import OrderListItem from '../partials/main/OrderListItem';
import PickingOrders from '../partials/main/PickingOrders';

export default class Main extends React.Component {

    constructor (props) {
        super (props)
        this.state = {
            isLoading: true,
            isLogin: false,
            refreshing: false
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'openDrawer') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.toggleDrawer({
                    side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                    animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                });
            }
        }
    }

    _takeOrder = (order) => {
        Alert.alert("you just clicked Take")
    }

    _refresh = () => {
        return new Promise((resolve) => {
            this.setState({
                refreshing: true
            })
            this._getNewOrders(() => {
                this.setState({
                    refreshing: false
                }, resolve())
            })
        });
    }

    _getNewOrders = (cb) => {
        fetch('https://api-jp.kii.com/api/apps/2c1pzz9jg5dd/buckets/ORDERS/query', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + Global.userAccessToken,
                'Content-Type': 'application/vnd.kii.QueryRequest+json',
            },
            body: JSON.stringify({
                "bucketQuery": {
                    "clause": {
                        "type": "eq",
                        "field": "order_status",
                        "value": 0
                    },
                    "orderBy": "timestamp_order_placed",
                    "descending": true
                },
                "bestEffortLimit": 10
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    orderList: responseJson.results.map(order => {
                        return {
                            key: order['_id'],
                            orderInfo: order
                        }
                    })
                }, cb)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillMount () {
        if (Global.userAuthenticated === false) {
            this.props.navigator.showModal({
                screen: "Authentication", // unique ID registered with Navigation.registerScreen
                title: "User Authentication", // title of the screen as appears in the nav bar (optional)
                passProps: {
                    didLogin: () => {
                        this._getNewOrders()
                    }
                }, // simple serializable object that will pass as props to the modal (optional)
                navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                animationType: 'none' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            });
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <Tabs>
                    <View title="New Orders" style={styles.content}>
                        <FlatList
                            onRefresh={this._refresh}
                            refreshing={this.state.refreshing}
                            data={this.state.orderList}
                            renderItem={({item}) => <OrderListItem
                                order={item.orderInfo}
                                takeOrder={this._takeOrder}
                                // onOrderAgainPress={this.goToShop}
                                // onShopPress={this.goToShop}
                                // onOrderPress={this.goToOrderInfo}
                            />}
                        />
                    </View>
                    {/* Second tab */}
                    <View title="Picking" style={styles.content}>
                        <FlatList
                            onRefresh={this._refresh}
                            refreshing={this.state.refreshing}
                            data={this.state.orderList}
                            renderItem={({item}) => <OrderListItem
                                order={item.orderInfo}
                                takeOrder={this._takeOrder}
                                // onOrderAgainPress={this.goToShop}
                                // onShopPress={this.goToShop}
                                // onOrderPress={this.goToOrderInfo}
                            />}
                        />
                    </View>
                    {/* Third tab */}
                    <View title="Delivering" style={styles.content}>
                        <FlatList
                            onRefresh={this._refresh}
                            refreshing={this.state.refreshing}
                            data={this.state.orderList}
                            renderItem={({item}) => <OrderListItem
                                order={item.orderInfo}
                                takeOrder={this._takeOrder}
                                // onOrderAgainPress={this.goToShop}
                                // onShopPress={this.goToShop}
                                // onOrderPress={this.goToOrderInfo}
                            />}
                        />
                    </View>

                </Tabs>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // App container
    container: {
        flex: 1,                            // Take up all screen
        backgroundColor: '#FFFFFF',         // Background color
    },
    // Tab content container
    content: {
        flex: 1,                            // Take up all available space
        justifyContent: 'center',           // Center vertically
        alignItems: 'stretch',              // Center horizontally
        backgroundColor: '#f0f0f0',         // Darker background for content area
    },
    // Content header
    header: {
        margin: 10,                         // Add margin
        color: '#000000',                   // White color
        fontSize: 26,                       // Bigger font size
    },
    // Content text
    text: {
        marginHorizontal: 20,               // Add horizontal margin
        color: 'rgba(0, 0, 0, 0.75)',       // Semi-transparent text
        textAlign: 'center',                // Center
        fontFamily: 'Avenir',
        fontSize: 18,
    }
});