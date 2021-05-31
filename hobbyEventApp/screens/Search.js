import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';

import {Search, MapMarkerAltSolid} from '../components/icons';

const emptyContent = () => {
  return <Text>Aradığınız etkinlik veya sanatçı bulunamadı.</Text>;
};

export default function SearchScreen({navigation}) {
  const [query, setQuery] = useState();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchByKeywordFromBackend() {
    setQuery(null);
    setLoading(true);
    setEvents([]);
    const searchedEvents = await axios(
      `http://127.0.0.1:8080/api/event-search?keyword=${query.toLowerCase()}`,
    );

    if (searchedEvents.data.status == 200) {
      setEvents(searchedEvents.data.data);
    }
    setLoading(false);
  }

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
        style={{marginTop: 70}}
        ListEmptyComponent={emptyContent}
      />
    );
  }

  return (
    <View>
      <View style={[styles.searchHeader]}></View>

      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              value={query}
              placeholder="Etkinlik, sanatçı arayın."
              style={styles.searchInput}
              placeholderTextColor="rgba(255, 255, 255, 0.85)"
              selectionColor="rgba(255, 255, 255, 0.85)"
              onChangeText={text => setQuery(text)}
            />
            {query ? (
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => searchByKeywordFromBackend()}>
                <Search stroke={'#fff'} width={30} height={30} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {loading ? (
          <View style={{flex: 1, justifyContent: 'center', marginTop: 70}}>
            <ActivityIndicator size="large" color="#542AE7" />
          </View>
        ) : (
          renderEventList()
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    fontSize: 28,
    paddingLeft: 5,
    paddingRight: 15,
    color: '#fff',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, 0.5)',
    width: '100%',
    height: 60,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
  },
  searchHeader: {
    backgroundColor: '#9B64FE',
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    top: 0,
  },
});
