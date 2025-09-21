
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';
import { Song } from '../types/music';

interface SongItemProps {
  song: Song;
  onPress: () => void;
  isPlaying?: boolean;
  showArtwork?: boolean;
}

export default function SongItem({ song, onPress, isPlaying = false, showArtwork = true }: SongItemProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {showArtwork && (
        <Image source={{ uri: song.artwork }} style={styles.artwork} />
      )}
      
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, isPlaying && styles.playingTitle]} numberOfLines={1}>
            {song.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {song.artist}
          </Text>
        </View>
        
        <View style={styles.rightContainer}>
          <Text style={styles.duration}>{formatDuration(song.duration)}</Text>
          {isPlaying && (
            <Ionicons name="volume-high" size={16} color={colors.primary} style={styles.playingIcon} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  playingTitle: {
    color: colors.primary,
  },
  artist: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 8,
  },
  playingIcon: {
    marginLeft: 4,
  },
});
