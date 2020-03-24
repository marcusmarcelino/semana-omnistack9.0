import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, Text, Image, AsyncStorage, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {

  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.1.13:3001', {
        query: { user_id }
      })
      socket.on('booking_response', booking => {
        Alert.alert(`Sua Reservam em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APVROVADA' : 'REJEITADA'}`);
        console.log(`Sua Reservam em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APVROVADA' : 'REJEITADA'}`);
      })
    })
  }, [])

  useEffect(() =>{
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
});