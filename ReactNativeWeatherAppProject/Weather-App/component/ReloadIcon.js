import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

export default function ReloadIcon({load}) {
    return (
        <View style={{alignItems: 'flex-start'}}>
            <Ionicons onPress={load} name="refresh" size={40} color="black" style={styles.reloadIcon}/>
        </View>
    )
};



const styles = StyleSheet.create({
    reloadIcon: {
        // alignSelf: 'flex-end',
        position: 'absolute',
        right: 20,
        top: 30,
        color: '#5e9',
        padding: 10,
    }
});