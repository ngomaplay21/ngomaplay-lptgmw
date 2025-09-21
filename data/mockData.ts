
import { Song, Album, Playlist, Artist } from '../types/music';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    album: 'Nocturnal Vibes',
    duration: 245,
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    isLiked: true,
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neon Nights',
    album: 'Synthwave Collection',
    duration: 198,
    artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    isLiked: false,
  },
  {
    id: '3',
    title: 'Ocean Waves',
    artist: 'Coastal Breeze',
    album: 'Natural Sounds',
    duration: 312,
    artwork: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    isLiked: true,
  },
  {
    id: '4',
    title: 'Urban Rhythm',
    artist: 'City Beats',
    album: 'Street Symphony',
    duration: 267,
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    isLiked: false,
  },
  {
    id: '5',
    title: 'Starlight Serenade',
    artist: 'Cosmic Journey',
    album: 'Galactic Melodies',
    duration: 289,
    artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    isLiked: true,
  },
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Nocturnal Vibes',
    artist: 'Luna Eclipse',
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    year: 2023,
    songs: [mockSongs[0]],
  },
  {
    id: '2',
    title: 'Synthwave Collection',
    artist: 'Neon Nights',
    artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    year: 2023,
    songs: [mockSongs[1]],
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'My Favorites',
    description: 'Songs I love to listen to',
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    songs: mockSongs.filter(song => song.isLiked),
    isPublic: false,
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing',
    artwork: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    songs: [mockSongs[0], mockSongs[2]],
    isPublic: true,
  },
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Luna Eclipse',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    followers: 125000,
    isFollowing: true,
  },
  {
    id: '2',
    name: 'Neon Nights',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    followers: 89000,
    isFollowing: false,
  },
];
