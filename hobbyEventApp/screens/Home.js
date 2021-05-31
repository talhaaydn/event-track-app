import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {MapMarkerAltSolid} from '../components/icons';
import axios from 'axios';
import moment from 'moment';

const emptyContent = () => {
  return <Text>Henüz bir etkinlik eklenmedi. Lütfen arama yapın.</Text>;
};

const HomeScreen = ({navigation}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const fetchedEvents = await axios('http://127.0.0.1:8080/api/event');
    if (fetchedEvents.data.status == 200) {
      setEvents(fetchedEvents.data.data);
    }
    setLoading(false);
  };

  const getDate = date => {
    return moment(date.split('T')[0]).format('DD MMM, Y');
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
          {item.date != '' ? (
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 14,
                color: '#FE9F6A',
                letterSpacing: -0.5,
                textTransform: 'uppercase',
              }}>
              {getDate(item.date)}
            </Text>
          ) : null}

          <Text
            style={{
              fontFamily: 'Inter-Bold',
              fontSize: 16,
              color: '#332C34',
              marginVertical: 5,
            }}>
            {item.title}
          </Text>
          {item.place != '' ? (
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
                  textTransform: 'uppercase',
                }}>
                {item.place}
              </Text>
            </View>
          ) : null}
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
        onRefresh={getEvents}
        refreshing={loading}
        ListEmptyComponent={emptyContent}
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
        Yaklaşan Etkinlikler {events.length > 0 ? `(${events.length})` : null}
      </Text>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#542AE7" />
        </View>
      ) : (
        renderEventList()
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
