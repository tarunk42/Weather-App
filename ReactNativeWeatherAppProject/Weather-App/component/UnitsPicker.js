import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from "@react-native-community/picker";

export default function UnitsPicker({unitsSystem, setUnitsSystem}) {
    return (
        <View>
            <Picker 
                selectedValue={unitsSystem} 
                onValueChange={(item) => setUnitsSystem(item)}
                mode="dropdown"
                style={styles.unitsSystem}
            >
                
                <Picker.Item label="°C" value="metric" color="#f29"/>
                <Picker.Item label="°F" value="imperial" color="#1ae"/>
            </Picker>
        </View>
    )
}



const styles = StyleSheet.create({
    unitsSystem: {
        width: '25%',
        alignSelf: 'center',
        height: 100.

    }
})