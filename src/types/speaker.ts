export interface Speaker {
  _id: string;
  name: string;
  bio?: string;
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  position?: string;
  company?: string;
}