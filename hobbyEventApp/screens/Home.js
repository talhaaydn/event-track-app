import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {MapMarkerAltSolid} from '../components/icons';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const fetchedEvents = await axios('http://127.0.0.1:8080/api/event');
    if (fetchedEvents.data.status == 200) {
      setEvents(fetchedEvents.data.data);
    }
  };

  function renderEventList() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Event', {
            item,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Image
          source={{
            uri: item.image_url,
          }}
          style={{width: 80, height: 100, borderRadius: 10}}
          resizeMode="cover"
        />
        <View style={{flex: 1, marginLeft: 20}}>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: 14,
              color: '#FE9F6A',
              letterSpacing: -0.5,
            }}>
            {item.date}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: 16,
              color: '#332C34',
              marginVertical: 5,
            }}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MapMarkerAltSolid
              width={14}
              height={14}
              fill={'#542AE7'}
              style={{opacity: 0.8}}
            />
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                color: '#B1B6D4',
                marginLeft: 7,
              }}>
              {item.place}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{
          fontFamily: 'Inter-ExtraBold',
          paddingHorizontal: 20,
          marginBottom: 20,
          fontSize: 22,
        }}>
        Yaklaşan Etkinlikler
      </Text>

      {renderEventList()}
    </SafeAreaView>
  );
};

export default HomeScreen;
