export interface MyLinkProfile {
  username: string; // e.g. "alex_creator"
  displayName: string; // e.g. "Alex Kim"
  bio: string; // e.g. "디지털 크리에이터 & 개발자 🚀"
  avatarUrl: string; // 프로필 이미지 URL
  socials: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    github?: string;
    email?: string;
    [key: string]: string | undefined;
  };
}

export interface MyLinkTheme {
  presetId?: string;
  backgroundType: 'color' | 'gradient';
  backgroundColor: string; // e.g. "#0f172a"
  gradientStart?: string; // e.g. "#6366f1"
  gradientEnd?: string; // e.g. "#a855f7"
  buttonShape: 'square' | 'rounded' | 'pill';
  buttonStyle: 'fill' | 'outline' | 'shadow' | 'glass';
  buttonColor: string; // e.g. "#ffffff"
  buttonTextColor: string; // e.g. "#0f172a"
  textColor: string; // e.g. "#ffffff"
}

export type BlockType = 'link' | 'header' | 'text' | 'divider';

export interface BaseBlock {
  id: string;
  type: BlockType;
  enabled: boolean;
  order: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface LinkBlock extends BaseBlock {
  type: 'link';
  title: string;
  url: string;
  icon?: string;
  thumbnailUrl?: string;
  description?: string; // 링크 상세 설명 / 서브텍스트
  badge?: string; // 강조 뱃지 (e.g. "HOT", "NEW", "FREE")
}

export interface HeaderBlock extends BaseBlock {
  type: 'header';
  title: string;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
}

export type Block = LinkBlock | HeaderBlock | TextBlock | DividerBlock;

export interface MyLinkStoreData {
  profile: MyLinkProfile;
  theme: MyLinkTheme;
  blocks: Block[];
}
