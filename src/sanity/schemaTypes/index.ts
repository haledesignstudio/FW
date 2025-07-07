import { type SchemaTypeDefinition } from 'sanity'
import keynoteSpeaker from './keynoteSpeaker'
import whatWeDo from './whatWeDo'
import shareholderValueAnalytics from './shareholderValueAnalytics';
import keynote from './keynote';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [keynoteSpeaker, whatWeDo, shareholderValueAnalytics, keynote],
};
