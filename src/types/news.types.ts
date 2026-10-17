export interface INewsDetails {
  id: string;
  title: string;
  description: Description;
  link: string;
  firstPublished: Date;
  lastPublished: Date;
  byline: { name: string; role: string }[];
  topics: { id: string; name: string }[];
  tags: string[];
  imageUrl: string;
  body: INewsDetailsBody[];
  text: string;
  wordCount: number;
  source: string;
  sourceUrl: string;
}

export interface INewsDetailsBody {
  type: string;
  text?: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
  copyrightHolder?: string;
}

interface TextFragment {
  type: string;
  model: {
    text: string;
    attributes: string[];
  };
}

interface ParagraphBlock {
  type: string;
  model: {
    text: string;
    blocks: TextFragment[];
  };
}

interface TextBlock {
  type: string;
  model: {
    blocks: ParagraphBlock[];
  };
}

interface Description {
  blocks: TextBlock[];
}


export interface IOtherSection {
  curationId: string;
  title: string;
  curationType: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
    firstPublished: Date
  }[];
}

export interface ICategoryNews {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: Date;
  lastPublished: Date;
  source: string;
}

export interface INews {
  title: string;
  id: string;
}

export interface IHeadline {
  id: string;
  title: string;
}

export interface ICats {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}
