import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {MapMarkerAltSolid} from '../components/icons';

const HomeScreen = ({navigation}) => {
  const events = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cem Adrian',
      date: '21 MAY, 2021',
      place: 'HAYAL KAHVESİ BAHÇEŞEHİR',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Cem Adrian',
      date: '22 MAY, 2021',
      place: 'HAYAL KAHVESİ ANTALYA',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Cem Adrian',
      date: '23 MAY, 2021',
      place: 'YENİ MAHALLE NAZIM HİKMET KM',
    },
    {
      id: '58694a0f-30a1-471f-bd96-145571e29d72',
      title: 'Cem Adrian',
      date: '06 HAZ, 2021',
      place: 'AVLU KONGRE VE KM',
    },
  ];

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
          // source={{
          //   uri:
          //     'https://cdn.dribbble.com/users/7073902/screenshots/15547226/media/3caaf2f04af87df5f7cecbc6790e9816.png?compress=1&resize=1600x1200',
          // }}
          source={require('../assets/images/cem-adrian.png')}
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
        keyExtractor={item => item.id}
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
