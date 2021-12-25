export interface IUser {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  profilePhoto: string;
  bark: string;
  location: string;
  description: string;
  groups: string[];
  groupRequests: string[];
  posts: object[];
  favorites: string[];
  friends: string[];
  friendRequests: object[];
  friendRequestsSent: object[];
  notifications: boolean;
}
export interface IdogSpot {
  name: string;
  kind: string;
  selectedFile: string;
  rating: number[];
  mapDirections: string;
}
export interface Igroup {
  name: string;
  creator: string;
  members: string[];
  createdAt: Date;
  invitations: string[];
  meetups: { frequency: string; time: string; dogSpotId: string }[];
}
export interface Ipost {
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likes: string[];
  comments: string[];
  createdAt: string;
}
export interface Ishelter {
  name: string;
  link: string;
  pnumber: string;
  country: string;
  region: string;
}
