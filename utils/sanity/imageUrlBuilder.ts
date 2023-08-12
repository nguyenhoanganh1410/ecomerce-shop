import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';
import { sanityClientValue } from './connection';

const builder = imageUrlBuilder(sanityClientValue);

export function imageUrlFor(source: any) {
  return builder.image(source);
}
