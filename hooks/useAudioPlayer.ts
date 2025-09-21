
import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { Song } from '../types/music';

export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const positionUpdateInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (positionUpdateInterval.current) {
        clearInterval(positionUpdateInterval.current);
      }
    };
  }, [sound]);

  const loadSong = async (song: Song) => {
    try {
      setIsLoading(true);
      
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.audioUrl },
        { shouldPlay: false }
      );

      setSound(newSound);
      setCurrentSong(song);
      setDuration(song.duration * 1000); // Convert to milliseconds
      setPosition(0);
      
      console.log('Song loaded:', song.title);
    } catch (error) {
      console.log('Error loading song:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const play = async () => {
    if (sound) {
      try {
        await sound.playAsync();
        setIsPlaying(true);
        startPositionUpdates();
        console.log('Playing song');
      } catch (error) {
        console.log('Error playing song:', error);
      }
    }
  };

  const pause = async () => {
    if (sound) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
        stopPositionUpdates();
        console.log('Paused song');
      } catch (error) {
        console.log('Error pausing song:', error);
      }
    }
  };

  const stop = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
        setPosition(0);
        stopPositionUpdates();
        console.log('Stopped song');
      } catch (error) {
        console.log('Error stopping song:', error);
      }
    }
  };

  const seekTo = async (positionMillis: number) => {
    if (sound) {
      try {
        await sound.setPositionAsync(positionMillis);
        setPosition(positionMillis);
        console.log('Seeked to position:', positionMillis);
      } catch (error) {
        console.log('Error seeking:', error);
      }
    }
  };

  const startPositionUpdates = () => {
    if (positionUpdateInterval.current) {
      clearInterval(positionUpdateInterval.current);
    }
    
    positionUpdateInterval.current = setInterval(async () => {
      if (sound && isPlaying) {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis || 0);
            if (status.didJustFinish) {
              setIsPlaying(false);
              setPosition(0);
              stopPositionUpdates();
            }
          }
        } catch (error) {
          console.log('Error getting position:', error);
        }
      }
    }, 1000);
  };

  const stopPositionUpdates = () => {
    if (positionUpdateInterval.current) {
      clearInterval(positionUpdateInterval.current);
      positionUpdateInterval.current = null;
    }
  };

  return {
    currentSong,
    isPlaying,
    isLoading,
    position,
    duration,
    loadSong,
    play,
    pause,
    stop,
    seekTo,
  };
};
