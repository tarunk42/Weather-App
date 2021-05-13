import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from "expo-location";  
import WeatherInfo from './component/WeatherInfo';
import UnitsPicker from './component/UnitsPicker';
import { colors } from "./utils/index";
import ReloadIcon from "./component/ReloadIcon";
import WeatherDetails from './component/WeatherDetails';

const Weather_API_key = '7907b5ee8aeba0cedb2af6ea5d205736';
const Base_Weather_Url =  'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');


  useEffect(() => {
    load()
  }, [unitsSystem]);

  async function load() {

    setCurrentWeather(null);

    try {
      let {status} = await Location.requestBackgroundPermissionsAsync()

      if(status != 'granted') {
        setErrorMessage('Access to location is needed to run the app')
        return
      }
      const location =await Location.getCurrentPositionAsync()

      const {latitude, longitude} = location.coords

      const WeatherUrl = `${Base_Weather_Url}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${Weather_API_key}`

      const response = await fetch(WeatherUrl)

      const result = await response.json()

      if(response.ok) {
        setCurrentWeather(result)
      } else{
        setErrorMessage(result.message)
      }

      // alert(`Latitude: ${latitude}, Longitude: ${longitude}`)

    } catch (e) { 
      setErrorMessage(error.message)
    }
  }

  if(currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ReloadIcon load={load}/>
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <WeatherInfo currentWeather={currentWeather}/>
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>
    );
  } 
  else if (errorMessage){
    return (
      <View style={styles.container}>
        <Text style={{color: 'blue'}}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } 
  else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
});
