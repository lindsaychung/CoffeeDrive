/**
 * Created by leonardean on 11/08/2017.
 */
import React from 'react';
import {View, StyleSheet, ActivityIndicator, RefreshControl, ScrollView, Text, Button} from 'react-native';
import Global from '../../Global';
import Tabs from '../partials/common/Tabs'
import OrderListItem from '../partials/main/OrderListItem';
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-root-toast';
import PickingOrders from '../partials/main/PickingOrders';
import DeliveringOrder from '../partials/main/DeliveringOrder';

export default class Main extends React.Component {

    constructor (props) {
        console.log('constructed')
        super (props)
        this.state = {
            isLoading: true,
            isLogin: false,
            refreshing: false,
            processingOrder: false,
            tabSelected: 0
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
        this.setState({
            processingOrder: true
        }, () => {
            fetch('https://api-jp.kii.com/api/apps/' + Global.appID + '/buckets/ORDERS/objects/'
                + order.orderInfo._id, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + Global.userAccessToken,
                    'Content-Type': 'application/json',
                    'X-Kii-AppID': Global.appID,
                    'X-Kii-AppKey': Global.appKey
                },
                body: JSON.stringify({
                    driver: {
                        id: Global.userID,
                        display_name: Global.username,
                        avatar_url: Global.avatar_url
                    },
                    order_status: 1,
                    timestamp_order_status_1: new Date()
                })
            })
                .then((response) => {
                    console.log(response)
                    return response.json()
                })
                .then((responseJson) => {
                    Toast.show('Order Taken')
                    this.setState({
                        processingOrder: false
                    }, () => {
                        this._getNewOrders()
                    })
                })
        })
    }

    _pickOrder = (order) => {
        this.setState({
            processingOrder: true
        }, () => {
            fetch('https://api-jp.kii.com/api/apps/' + Global.appID + '/buckets/ORDERS/objects/'
                + order.pickingOrderInfo._id, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + Global.userAccessToken,
                    'Content-Type': 'application/json',
                    'X-Kii-AppID': Global.appID,
                    'X-Kii-AppKey': Global.appKey
                },
                body: JSON.stringify({
                    order_status: 4,
                    timestamp_order_status_4: new Date()
                })
            })
                .then((response) => {
                    console.log(response)
                    return response.json()
                })
                .then((responseJson) => {
                    Toast.show('Order Picked')
                    this.setState({
                        processingOrder: false
                    }, () => {
                        this._getPickingOrders()
                    })
                })
        })
    }

    _deliverOrder = (order) => {
        this.setState({
            processingOrder: true
        }, () => {
            fetch('https://api-jp.kii.com/api/apps/' + Global.appID + '/buckets/ORDERS/objects/'
                + order.deliveringOrderInfo._id, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + Global.userAccessToken,
                    'Content-Type': 'application/json',
                    'X-Kii-AppID': Global.appID,
                    'X-Kii-AppKey': Global.appKey
                },
                body: JSON.stringify({
                    order_status: 5,
                    timestamp_order_status_5: new Date()
                })
            })
                .then((response) => {
                    console.log(response)
                    return response.json()
                })
                .then((responseJson) => {
                    Toast.show('Order Delivered')
                    this.setState({
                        processingOrder: false
                    }, () => {
                        this._getPickingOrders()
                    })
                })
        })
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

    _refreshPickingOrders = () => {
        return new Promise((resolve) => {
            this.setState({
                refreshing: true
            })
            this._getPickingOrders(() => {
                this.setState({
                    refreshing: false
                }, resolve())
            })
        });
    }

    _refreshDeliveringOrders = () => {
        return new Promise((resolve) => {
            this.setState({
                refreshing: true
            })
            this._getDeliveringOrders(() => {
                this.setState({
                    refreshing: false
                }, resolve())
            })
        });
    }

    _getNewOrders = (cb) => {
        this.setState({
            isLoading: true
        })
        fetch('https://api-jp.kii.com/api/apps/' + Global.appID + '/buckets/ORDERS/query', {
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
                    "orderBy": "timestamp_order_status_0",
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
                    orderList: responseJson.results.map((order, index) => {
                        return {
                            key: index,
                            orderInfo: order
                        }
                    })
                }, cb)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _getDeliveringOrders = (cb) => {
        this.setState({
            isLoading: true
        }, () => {
            fetch('https://api-jp.kii.com/api/apps/' + Global.appID + '/buckets/ORDERS/query', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Global.userAccessToken,
                    'Content-Type': 'application/vnd.kii.QueryRequest+json',
                },
                body: JSON.stringify({
                    "bucketQuery": {
                        "clause": {
                            "type": "and",
                            "clauses": [
                                {
                                    "type": "eq",
                                    "field": "order_status",
                                    "value": 4
                                },
                                {
                                    "type": 'eq',
                                    "field": "driver.id",
                                    "value": Global.userID
                                }
                            ]
                        },
                        "orderBy": "timestamp_order_status_4",
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
                        orderList: responseJson.results.map((order, index) => {
                            return {
                                key: index,
                                deliveringOrderInfo: order
                            }
                        })
                    }, cb)
                })
                .catch((error) => {
                    console.error(error);
                });
        })
    }

    _getPickingOrders = (cb) => {
        this.setState({
            isLoading: true
        }, () => {
            fetch('https://api-jp.kii.com/api/apps/' + Global.appID + '/buckets/ORDERS/query', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Global.userAccessToken,
                    'Content-Type': 'application/vnd.kii.QueryRequest+json',
                },
                body: JSON.stringify({
                    "bucketQuery": {
                        "clause": {
                            "type": "and",
                            "clauses": [
                                {
                                    "type": "range",
                                    "field": "order_status",
                                    "upperLimit": 3,
                                    "upperIncluded": true,
                                    "lowerLimit": 1,
                                    "lowerIncluded": true
                                },
                                {
                                    "type": 'eq',
                                    "field": "driver.id",
                                    "value": Global.userID
                                }
                            ]
                        },
                        "orderBy": "order_status",
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
                        orderList: responseJson.results.map((order, index) => {
                            return {
                                key: index,
                                pickingOrderInfo: order
                            }
                        })
                    }, cb)
                })
                .catch((error) => {
                    console.error(error);
                });
        })
    }

    componentWillMount () {
        if (Global.userAuthenticated === false) {
            this.props.navigator.showModal({
                screen: "Authentication", // unique ID registered with Navigation.registerScreen
                title: "User Authentication", // title of the screen as appears in the nav bar (optional)
                passProps: {
                    didLogin: () => {
                        this._getNewOrders()
                        // this._getPickingOrders()
                        // this._getDeliveringOrders()
                    }
                }, // simple serializable object that will pass as props to the modal (optional)
                navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.tabSelected !== nextState.tabSelected) {
            if (nextState.tabSelected === 1) {
                this._getPickingOrders()
            } else if (nextState.tabSelected === 2) {
                this._getDeliveringOrders()
            } else if (nextState.tabSelected === 0) {
                this._getNewOrders()
            }
        }
    }

    render () {

        let newOrderListItems, pickingOrderListItems, deliveringOrderListItems
        if (Global.userAuthenticated === true && this.state.tabSelected === 0)
            newOrderListItems = this.state.isLoading === false ? this.state.orderList.map((item, index) => {
                return (
                    <OrderListItem
                        order={item.orderInfo}
                        takeOrder={() => {this._takeOrder(item)}}
                    />
                )
            }) :
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
        if (Global.userAuthenticated === true && this.state.tabSelected === 1)
            pickingOrderListItems = this.state.isLoading === false ? this.state.orderList.map((item, index) => {
                return (
                    <PickingOrders
                        order={item.pickingOrderInfo}
                        pickOrder={() => {this._pickOrder(item)}}
                    />
                )
            }):
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
        if (Global.userAuthenticated === true && this.state.tabSelected === 2)
            deliveringOrderListItems = this.state.isLoading === false ? this.state.orderList.map((item, index) => {
                return (
                    <DeliveringOrder
                        order={item.deliveringOrderInfo}
                        deliverOrder={() => {this._deliverOrder(item)}}
                    />
                )
            }):
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>

        return (
            <View style={styles.container}>
                <Spinner visible={this.state.processingOrder} size="small" textContent={"Processing Order..."}
                         textStyle={{color: '#FFF', marginTop: -30, fontSize: 14}} />
                <Tabs>
                    <View title="New Orders" style={styles.content} ref={() => {
                        if (this.state.tabSelected !== 0)
                            this.setState({
                                tabSelected:0
                            })
                    }}>
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._refresh}
                            />
                        }>
                            {newOrderListItems}
                        </ScrollView>
                    </View>
                    {/* Second tab */}
                    <View title="Picking" style={styles.content} ref={() => {
                        if (this.state.tabSelected !== 1)
                            this.setState({
                                tabSelected:1
                            })
                    }}>
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._refreshPickingOrders}
                            />
                        }>
                            {pickingOrderListItems}
                        </ScrollView>
                    </View>
                    {/* Third tab */}
                    <View title="Delivering" style={styles.content} ref={() => {
                        if (this.state.tabSelected !== 2)
                            this.setState({
                                tabSelected:2
                            })
                    }}>
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._refreshDeliveringOrders}
                            />
                        }>
                            {deliveringOrderListItems}
                        </ScrollView>
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