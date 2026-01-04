
export interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  avatar: string;
  distance: string;
}

export interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: 'Moment' | 'News' | 'Gear';
}

export interface GearItem {
  id: string;
  name: string;
  brand: string;
  rating: number;
  price: string;
  image: string;
  tags: string[];
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  author: string;
}
