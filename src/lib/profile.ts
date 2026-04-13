import type { Profile } from '../types';

export async function loadProfile(): Promise<Profile> {
  const response = await fetch('/profile.json');

  if (!response.ok) {
    throw new Error('Unable to load profile data.');
  }

  const profile = (await response.json()) as Profile;
  return profile;
}
