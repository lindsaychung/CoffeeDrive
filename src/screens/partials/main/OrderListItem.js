/**
 * Created by leonardean on 11/08/2017.
 */
import React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class OrderListItem extends React.Component {

    constructor (props) {
        super(props)
    }

    render () {
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
                    <Icon.Button backgroundColor="#0c64ff" borderRadius={2}
                                 iconStyle={{marginRight: 0}} style={{alignSelf: 'center'}}
                                 onPress={this.props.takeOrder}>
                        Take Order
                    </Icon.Button>
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
        height: 40,
        paddingHorizontal: 80,
        borderTopColor: "#f0f0f0",
        borderTopWidth: 0.5,
        paddingTop: 3
    },
    target: {
        flexDirection: 'row',
        padding: 5,
    }
})