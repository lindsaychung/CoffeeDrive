/**
 * Created by leonardean on 11/08/2017.
 */
import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';

export default class OrderListItem extends React.Component {

    constructor (props) {
        super(props)
        console.log(this.props)
    }

    componentWillMount () {



        if (this.props.order !== undefined)
            switch(this.props.order.order_status) {
                case 1:
                    this.setState({
                        orderStatus: "Order Accepted"
                    })
                    break
                case 2:
                    this.setState({
                        orderStatus: "Coffee Preparing"
                    })
                    break
                case 3:
                    this.setState({
                        orderStatus: "Coffee Ready"
                    })
                    break
            }
    }

    render () {
        if (this.props.order === undefined)
            return (
                <View style={{marginTop: 50}}>

                </View>
            )
        return (
            <TouchableOpacity style={styles.container}>
                <View>
                    <View style={styles.target}>
                        <View style={{flex: 1, alignItems: 'center', borderRightColor: '#f0f0f0', borderRightWidth: 0.5}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0c64ff'}}>$ {this.props.order.delivery_fee}</Text>
                            <Text style={{fontSize: 10, color: 'grey'}}>Delivery Fee</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0c64ff'}}>ASAP</Text>
                            <Text style={{fontSize: 10, color: 'grey'}}>Expected Delivery Time</Text>
                        </View>
                    </View>
                    <View style={[styles.target, {marginBottom: 5}]}>
                        <Text style={{color: 'green', fontSize: 12, width: 30}}>From</Text>
                        <View style={{marginHorizontal: 5, flex: 1}}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.order.shop.name}</Text>
                            <Text>{this.props.order.shop.place.formatted_address}</Text>
                        </View>
                        <Text style={{color: 'grey', fontSize: 12}}>2.5 km</Text>
                    </View>
                    <View style={styles.target}>
                        <Text style={{color: '#d6cd07', fontSize: 12, width: 30}}>To</Text>
                        <View style={{marginHorizontal: 5, flex: 1}}>
                            <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{this.props.order.customer.recipient.place.formatted_address}</Text>
                        </View>
                        <Text style={{color: 'grey', fontSize: 12}}>0.5 km</Text>
                    </View>
                    <View style={{marginLeft: 40, marginVertical: 5}}>
                        <Text style={{fontSize: 10, color: 'grey'}}>Order ID: {this.props.order._id}</Text>
                    </View>
                </View>
                <View style={styles.takeOrder}>
                    <Text style={{alignSelf: 'center'}}>{this.state.orderStatus}</Text>
                    <Button style={styles.button}
                            containerStyle={{borderRadius: 5, overflow: 'hidden'}}
                            onPress={this.props.pickOrder}>
                        Order Picked
                    </Button>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 4,
        paddingHorizontal: 5
    },
    takeOrder: {
        paddingHorizontal: 10,
        borderTopColor: "#f0f0f0",
        borderTopWidth: 0.5,
        paddingVertical: 3,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    target: {
        flexDirection: 'row',
        padding: 5,
    },
    button: {
        backgroundColor: "#dcb626",
        color: "white",
        padding: 8,
        fontSize: 14,
        width: 120
    }
})