
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { mockSongs, mockAlbums, mockPlaylists } from '../data/mockData';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import MusicPlayer from '../components/MusicPlayer';
import SongItem from '../components/SongItem';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const audioPlayer = useAudioPlayer();

  const handleSongPress = async (song: any) => {
    console.log('Song pressed:', song.title);
    if (audioPlayer.currentSong?.id === song.id) {
      if (audioPlayer.isPlaying) {
        await audioPlayer.pause();
      } else {
        await audioPlayer.play();
      }
    } else {
      await audioPlayer.loadSong(song);
      await audioPlayer.play();
    }
  };

  const handlePlayPause = async () => {
    if (audioPlayer.isPlaying) {
      await audioPlayer.pause();
    } else {
      await audioPlayer.play();
    }
  };

  const renderHomeContent = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Played</Text>
        {mockSongs.slice(0, 3).map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onPress={() => handleSongPress(song)}
            isPlaying={audioPlayer.currentSong?.id === song.id && audioPlayer.isPlaying}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Now</Text>
        {mockSongs.slice(2, 5).map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onPress={() => handleSongPress(song)}
            isPlaying={audioPlayer.currentSong?.id === song.id && audioPlayer.isPlaying}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Playlists</Text>
        {mockPlaylists.map((playlist) => (
          <TouchableOpacity key={playlist.id} style={styles.playlistItem}>
            <Text style={styles.playlistName}>{playlist.name}</Text>
            <Text style={styles.playlistDescription}>{playlist.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderSearchContent = () => (
    <View style={[styles.content, styles.centerContent]}>
      <Text style={styles.comingSoon}>Search Coming Soon</Text>
      <Text style={styles.comingSoonDesc}>
        Discover new music, artists, and playlists
      </Text>
    </View>
  );

  const renderLibraryContent = () => (
    <View style={[styles.content, styles.centerContent]}>
      <Text style={styles.comingSoon}>Your Library</Text>
      <Text style={styles.comingSoonDesc}>
        Access your saved music and playlists
      </Text>
    </View>
  );

  const renderProfileContent = () => (
    <View style={[styles.content, styles.centerContent]}>
      <Text style={styles.comingSoon}>Profile</Text>
      <Text style={styles.comingSoonDesc}>
        Manage your account and preferences
      </Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'search':
        return renderSearchContent();
      case 'library':
        return renderLibraryContent();
      case 'profile':
        return renderProfileContent();
      default:
        return renderHomeContent();
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Header 
        showLogo={activeTab === 'home'}
        title={activeTab !== 'home' ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : undefined}
      />
      
      <View style={styles.mainContent}>
        {renderContent()}
      </View>

      {audioPlayer.currentSong && (
        <MusicPlayer
          song={audioPlayer.currentSong}
          isPlaying={audioPlayer.isPlaying}
          onPlayPause={handlePlayPause}
          position={audioPlayer.position}
          duration={audioPlayer.duration}
        />
      )}

      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  playlistItem: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  comingSoon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  comingSoonDesc: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
