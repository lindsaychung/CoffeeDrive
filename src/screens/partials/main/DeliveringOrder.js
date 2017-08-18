/**
 * Created by leonardean on 11/08/2017.
 */
import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';

export default class DeliveringOrder extends React.Component {

    constructor (props) {
        super(props)
        console.log(this.props)
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
                            <Text numberOfLines={1}>{this.props.order.shop.place.formatted_address}</Text>
                        </View>
                        <Text style={{color: 'grey', fontSize: 12}}>2.5 km</Text>
                    </View>
                    <View style={styles.target}>
                        <Text style={{color: '#d6cd07', fontSize: 12, width: 30}}>To</Text>
                        <View style={{marginHorizontal: 5, flex: 1}}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.order.customer.recipient.place.formatted_address}</Text>
                        </View>
                        <Text style={{color: 'grey', fontSize: 12}}>0.5 km</Text>
                    </View>
                    <View style={{marginLeft: 40, marginVertical: 5}}>
                        <Text style={{fontSize: 10, color: 'grey'}}>Order ID: {this.props.order._id}</Text>
                    </View>
                </View>
                <View style={styles.takeOrder}>
                    <Text style={{alignSelf: 'center'}}>Order on the way</Text>
                    <Button style={styles.button}
                            containerStyle={{borderRadius: 5, overflow: 'hidden'}}
                            onPress={this.props.deliverOrder}>
                        Order Delivered
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
        backgroundColor: "green",
        color: "white",
        padding: 8,
        fontSize: 14,
        width: 140
    }
})