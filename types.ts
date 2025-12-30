export interface Badge {
  id: string;
  label: string;
  icon: string;
  category: 'lifestyle' | 'time' | 'interests' | 'verified';
}

export interface Person {
  id: string;
  name: string;
  age: number;
  photo: string;
  photos?: string[]; // Multiple photos for profile
  badges: Badge[];
  compatibility?: number;
  compatibilityReasons?: string[];
  verified: boolean;
  distance?: string;
  bio?: string;
  about?: string;
}

export interface Plan {
  id: string;
  title: string;
  category: 'event' | 'casual' | 'activity';
  image: string;
  date?: string;
  time?: string;
  location: string;
  participants: number;
  maxParticipants?: number;
  description: string;
  price?: string;
  cashback?: string;
  tags: string[];
  createdBy?: Person;
  interestedPeople: Person[];
  isCustom?: boolean; // User created plan
  isPairActivity?: boolean; // For activities meant for 2 people
}

export interface ConfirmedMeeting {
  id: string;
  plan: Plan;
  person: Person;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
  isToday?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Chat {
  id: string;
  person: Person;
  plan: Plan;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}