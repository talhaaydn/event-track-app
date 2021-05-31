import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {ChevronLeft, Plus, MapMarkerAltSolid} from '../components/icons';

const EventScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const {item} = route.params;
    setEvent(item);
    setLoading(false);
  });

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#542AE7" />
    </View>
  ) : (
    <View style={{flex: 1}}>
      {/* Header */}
      <View>
        {/* Page Image */}
        <Image
          source={{uri: event.image_url}}
          style={{
            width: '100%',
            height: 250,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            position: 'absolute',
            top: 0,
          }}
          resizeMode="cover"
        />
        {/* Back Button */}
        <SafeAreaView>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: 'rgba(216, 219, 233, 0.9)',
                width: 40,
                height: 30,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#332C34',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 1,
              }}>
              <ChevronLeft stroke={'#332C34'} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Page Content */}
      <ScrollView
        style={{
          marginTop: 190,
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{paddingBottom: 100}}>
        {/* Page Title */}
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontSize: 28,
            letterSpacing: -0.5,
            color: '#332C34',
          }}>
          {event.title}
        </Text>

        {/* Event Information */}
        <View
          style={{flexDirection: 'row', marginTop: 20, alignItems: 'center'}}>
          {/* Event Date */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            {/* Date Box */}
            <View
              style={{
                width: 60,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EEE7F7',
                borderRadius: 20,
              }}>
              {/* Month */}
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 14,
                  color: '#FE9F6A',
                }}>
                MAY
              </Text>

              {/* Day with Number */}
              <Text
                style={{
                  fontFamily: 'Inter-ExtraBold',
                  fontSize: 18,
                  color: '#2B0C0D',
                }}>
                21
              </Text>
            </View>

            {/* Date Box Right */}
            <View
              style={{
                marginLeft: 14,
                justifyContent: 'center',
              }}>
              {/* Day with Name */}
              <Text
                style={{
                  fontFamily: 'Inter-ExtraBold',
                  fontSize: 16,
                  color: '#2B0C0D',
                }}>
                Cuma
              </Text>

              {/* Time */}
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 13,
                  color: '#7C8298',
                  marginTop: 5,
                }}>
                20:00
              </Text>
            </View>
          </View>
          {/* Add Callendar Button */}
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F2ECF8',
              height: 47,
              width: 145,
              borderRadius: 45,
              padding: 5,
            }}>
            <Text
              style={{
                color: '#9B64FE',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                marginLeft: 10,
              }}>
              Listeme Ekle
            </Text>

            <View
              style={{
                backgroundColor: '#9B64FE',
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Plus stroke={'#fff'} />
            </View>
          </TouchableOpacity> */}
        </View>

        {/* Location */}
        <View
          style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
          {/* Location Box */}
          <View
            style={{
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEE7F7',
              borderRadius: 20,
            }}>
            <MapMarkerAltSolid width={20} height={20} fill={'#9B64FE'} />
          </View>
          {/* Location Right */}
          <View
            style={{
              marginLeft: 14,
              justifyContent: 'center',
            }}>
            {/* Location Title */}
            <Text
              style={{
                fontFamily: 'Inter-ExtraBold',
                fontSize: 16,
                color: '#2B0C0D',
              }}>
              Mekan
            </Text>

            {/* Location Name */}
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                color: '#7C8298',
                marginTop: 5,
                textTransform: 'uppercase',
              }}>
              {event.place}
            </Text>
          </View>
        </View>

        {/* Event About Title */}
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontSize: 24,
            letterSpacing: -0.5,
            color: '#332C34',
            marginTop: 30,
          }}>
          Hakkında
        </Text>

        {/* Event About Text */}
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: 16,
            color: '#7C8298',
            marginTop: 15,
            lineHeight: 25,
            letterSpacing: -0.2,
          }}>
          {event.content}
        </Text>
      </ScrollView>

      {/* Get a Ticket Button Container */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 95,
          backgroundColor: '#fff',
        }}>
        {/* Get a Ticket Button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Event Detail', {page_url: event.page_url});
          }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: '#9B64FE',
            height: 55,
            borderRadius: 65,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* Get a Ticket Button Text */}
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: 18,
              letterSpacing: -0.5,
              color: '#fff',
            }}>
            Bilet Al
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventScreen;
