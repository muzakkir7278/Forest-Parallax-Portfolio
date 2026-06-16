/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExifData {
  camera: string;
  lens: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  focalLength: string;
}

export interface Photo {
  id: string;
  title: string;
  category: 'misty-woods' | 'lakes-rivers' | 'wildlife' | 'macro-details';
  description: string;
  src: string;
  location: string;
  date: string;
  exif: ExifData;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
