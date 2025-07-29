export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: 'user' | 'creator' | 'moderator' | 'admin';
  verified: boolean;
  followers: number;
  following: number;
  totalEarned: number;
  walletBalance: number;
  walletAddress?: string;
  createdAt: Date;
  bio?: string;
}

export interface Video {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  tags: string[];
  createdAt: Date;
  isLiked?: boolean;
  rewards: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  videoId: string;
  content: string;
  likes: number;
  createdAt: Date;
  isLiked?: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'reward' | 'withdrawal' | 'tip';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
  createdAt: Date;
}

export interface Report {
  id: string;
  reporterId: string;
  contentId: string;
  contentType: 'video' | 'comment' | 'user';
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  loginWithWallet: (address: string) => Promise<User>;
  logout: () => void;
  register: (email: string, password: string, username: string) => Promise<User>;
}