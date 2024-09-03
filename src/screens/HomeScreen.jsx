import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { api } from '../service/api';
import { Input, Spinner, Image, Center, Text, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [albums, setAlbums] = useState([])
  const [searchText, setSearchText] = useState('');

  const { navigate } = useNavigation()

  const getTopAlbumsInitialList
    = useCallback(async () => {
      setIsLoading(true)
      try {
        const res = await api.get({
          limit: 10,
          method: 'tag.gettopalbums',
          tag: 'my top albums'
        });
        if (res?.albums?.album) {
          setAlbums(res.albums.album);
        }
      } catch (error) {
        console.log("ERROR", error.message)
      } finally {
        setIsLoading(false)
      }
    }, [])

  const getTopAlbums = async (artistName) => {
    if (!artistName) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.get({
        method: 'artist.gettopalbums',
        artist: artistName,
        limit: 10
      })
      if (res?.topalbums?.album) {
        setAlbums(res.topalbums.album);
      }
    } catch (error) {
      console.log("ERROR", error.message)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getTopAlbumsInitialList()
  }, [])


  const renderItem =
    ({ item }) => {
      const image = item.image?.find(el => el.size === 'large')
      return (
        <Pressable mt={6} alignItems="center" justifyContent="center" flex={1} onPress={() => navigate('Album', {
          artist: item?.artist?.name,
          album: item?.name
        })}>
          <Image alt="AlbumImage" size="xl" source={{ uri: image['#text'] }} />
          <Text bold underline my={1}>{item?.name}</Text>
        </Pressable>
      )
    }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Input variant="rounded" placeholder="Find your favorite artist"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => getTopAlbums(searchText)} />
      {isLoading ?
        (
          <Center flex={1}>
            <Spinner size="lg" />
          </Center>
        ) :
        (
          <FlatList
            keyExtractor={el => el.name}
            numColumns={2}
            data={albums} renderItem={renderItem} />
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, padding: 10 }
});

export default HomeScreen;
