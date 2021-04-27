import React from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {ChevronLeft, Plus, MapMarkerAltSolid} from '../components/icons';

const EventScreen = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View>
        {/* Page Image */}
        <Image
          source={require('../assets/images/cem-adrian.png')}
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
          The Pretty Reckless
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
                29
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
                Friday
              </Text>

              {/* Time */}
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  fontSize: 13,
                  color: '#7C8298',
                  marginTop: 5,
                }}>
                10:00 PM
              </Text>
            </View>
          </View>
          {/* Add Callendar Button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F2ECF8',
              height: 47,
              width: 168,
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
              Add To Callendar
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
          </TouchableOpacity>
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
              Place
            </Text>

            {/* Location Name */}
            <Text
              style={{
                fontFamily: 'Inter-Medium',
                fontSize: 13,
                color: '#7C8298',
                marginTop: 5,
              }}>
              Zorlu PSM - Turkcell Platinum Sahnesi,
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
          About
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut orem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut orem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi utorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi utorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi utorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi utorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut
        </Text>
      </ScrollView>

      {/* Get a Ticket Button Container */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 105,
          backgroundColor: '#fff',
        }}>
        {/* Get a Ticket Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: '#9B64FE',
            height: 65,
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
            Get a Ticket
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventScreen;
