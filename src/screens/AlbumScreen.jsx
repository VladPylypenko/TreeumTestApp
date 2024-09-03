import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { api } from '../service/api';
import { Box, Button, Center, Text, Divider, HStack, Spinner, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

function formatTime(seconds) {
  // Calculate the minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad the seconds with leading zero if less than 10
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  // Return the formatted time as a string
  return `${minutes}:${formattedSeconds}`;
}

const AlbumScreen = ({ route }) => {
  const { artist, album } = route.params || {};
  const [isLoading, setIsLoading] = useState(true)
  const [tracks, setTracks] = useState([])

  const { navigate } = useNavigation();

  const getAlbumTracks
    = useCallback(async () => {
      try {
        const res = await api.get({
          method: 'album.getinfo',
          artist,
          album
        });
        if (res?.album?.tracks) {
          setTracks(res.album.tracks)
        }
      } catch (error) {
        console.log("ERROR", error.message)
      } finally {
        setIsLoading(false)
      }

    }, [])

  useEffect(() => {
    getAlbumTracks()
  }, [])

  const navigateToAlbumsDetails = () => {
    navigate('AlbumDetails', {
      artist,
      album
    })
  }

  const ListHeaderComponent = () => {
    return <Heading>{album}</Heading>
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      {isLoading ?
        (
          <Center flex={1}>
            <Spinner size="lg" />
          </Center>
        ) :
        (
          <FlatList
            keyExtractor={el => el?.['@attr'].rank}
            ListHeaderComponent={ListHeaderComponent}
            data={tracks.track}
            renderItem={({ item }) => {
              return (
                <Box>
                  <HStack alignItems="center" justifyContent="space-between">
                    <Text>{item.name}</Text>
                    <Text>{formatTime(item.duration)}</Text>
                  </HStack>
                  <Divider />
                </Box>
              )
            }}
          />)}
      <Button size="sm" colorScheme="blue" onPress={navigateToAlbumsDetails}>
        Album details
      </Button>
    </SafeAreaView>
  );
}

export default AlbumScreen

