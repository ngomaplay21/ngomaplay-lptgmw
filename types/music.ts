
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  audioUrl: string;
  isLiked?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  year: number;
  songs: Song[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  artwork: string;
  songs: Song[];
  isPublic: boolean;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  isFollowing?: boolean;
}
