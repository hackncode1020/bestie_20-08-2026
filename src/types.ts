export interface BestiePhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  caption: string;
  rotation: number; // degrees for polaroid tilt
  likes: number;
  tags: string[];
}

export interface SurpriseGift {
  id: string;
  title: string;
  icon: string;
  boxColor: string;
  ribbonColor: string;
  isOpened: boolean;
  surpriseType: 'certificate' | 'coupon' | 'music' | 'letter';
  content: {
    heading: string;
    subtitle: string;
    description: string;
    badges?: string[];
    actionLabel?: string;
  };
}

export interface BestieReason {
  id: string;
  title: string;
  emoji: string;
  description: string;
  isRevealed: boolean;
  category: 'funny' | 'heartfelt' | 'iconic' | 'unhinged';
}

export interface PinnedDrawing {
  id: string;
  dataUrl: string;
  author: string;
  timestamp: string;
  caption: string;
  stickersCount: number;
}
