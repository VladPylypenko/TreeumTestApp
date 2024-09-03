import React, { useCallback, useEffect, useState } from 'react'
import { api } from '../service/api';
import { Center, Text, Divider, HStack, Spinner, Container, Heading, ScrollView } from 'native-base';

const AlbumDetailsScreen = ({ route }) => {
  const { artist, album } = route.params || {};
  const [isLoading, setIsLoading] = useState(true)
  const [albumInfo, setAlbumInfo] = useState({
    album: {},
    artist: {}
  })

  const getAlbumDetails
    = useCallback(async () => {
      try {
        Promise.all([await api.get({
          method: 'album.getinfo',
          artist,
          album
        }), await api.get({
          method: 'artist.getInfo',
          artist
        })]).then(([albumRes, artistRes]) => {
          setAlbumInfo({
            album: albumRes.album,
            artist: artistRes.artist
          })
        })
      } catch (error) {
        console.log("ERROR", error.message)
      } finally {
        setIsLoading(false)
      }

    }, [])

  useEffect(() => {
    getAlbumDetails()
  }, [])

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} safeAreaTop padding={2}>
      {isLoading ?
        (
          <Center flex={1}>
            <Spinner size="lg" />
          </Center>
        ) :
        (
          <Container maxWidth="full" alignItems="center" flex={1}>
            <Heading>
              {albumInfo.album?.name}
            </Heading>
            <HStack w="full" justifyContent="space-between">
              <Text color="blueGray.500" mt="2">Playcount: {albumInfo?.album?.playcount}</Text>
              <Text color="blueGray.500" mt="2">Listeners: {albumInfo?.album?.listeners}</Text>
            </HStack>
            {albumInfo.album?.wiki && <Text mt="3" fontWeight="medium">
              {albumInfo.album?.wiki?.content}
            </Text>}
            <Divider marginY={6} w={'full'} />
            <Heading size="md">
              {albumInfo.artist?.name}
            </Heading>
            <HStack w="full" justifyContent="space-between">
              <Text color="blueGray.500" mt="2">Playcount: {albumInfo.artist?.stats?.playcount}</Text>
              <Text color="blueGray.500" mt="2">Listeners: {albumInfo.artist?.stats?.listeners}</Text>
            </HStack>
            {albumInfo.artist?.bio?.content && <Text mt="3" fontWeight="medium">
              {albumInfo.artist?.bio?.content}
            </Text>}
          </Container>
        )}
    </ScrollView>
  );
}

export default AlbumDetailsScreen
