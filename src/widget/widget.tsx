import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
function Widget() {
  const nowDate = moment().format('YYYY-MM-DD');
  const nowTime = moment().format('HH:mm:ss');
  return (
    <View style={styles.wrapper}>
      <Text style={styles.date}>{nowDate}</Text>
      <Text style={styles.time}>{nowTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  time: {
    color: 'white',
    fontSize: 30,
    elevation: 5,
  },
  date: {
    color: 'white',
    fontSize: 30,
    elevation: 5,
  },
});

export default Widget;
