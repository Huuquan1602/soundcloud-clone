import { beforeEach, describe, expect, it } from 'vitest';
import type { Track } from '@soundcloud-clone/shared-models';
import { PlayerStore } from './player.store';

describe('PlayerStore', () => {
  let store: PlayerStore;

  const mockTrack: Track = {
    id: 'track-1',
    title: 'Afterglow',
    artist: 'Echoes',
    artworkUrl: 'https://example.com/artwork.jpg',
    duration: 180,
  };

  beforeEach(() => {
    store = new PlayerStore();
  });

  it('should initialize with default state', () => {
    expect(store.currentTrack()).toBeNull();
    expect(store.isPlaying()).toBe(false);
    expect(store.hasTrack()).toBe(false);
  });

  it('should set the current track and start playing', () => {
    // Act
    store.play(mockTrack);

    // Assert
    expect(store.currentTrack()).toEqual(mockTrack);
    expect(store.isPlaying()).toBe(true);
    expect(store.hasTrack()).toBe(true);
  });

  it('should pause playback', () => {
    // Arrange
    store.play(mockTrack);

    // Act
    store.pause();

    // Assert
    expect(store.isPlaying()).toBe(false);
    expect(store.currentTrack()).toEqual(mockTrack);
  });

  it('should resume playback when a track exists', () => {
    store.play(mockTrack);
    store.pause();

    store.resume();

    expect(store.isPlaying()).toBe(true);
  });

  it('should not resume when no track exists', () => {
    store.resume();

    expect(store.isPlaying()).toBe(false);
    expect(store.currentTrack()).toBeNull();
  });

  it('should toggle playback state', () => {
    store.play(mockTrack);

    store.togglePlay();
    expect(store.isPlaying()).toBe(false);

    store.togglePlay();
    expect(store.isPlaying()).toBe(true);
  });

  it('should not toggle playback without a track', () => {
    store.togglePlay();

    expect(store.isPlaying()).toBe(false);
    expect(store.hasTrack()).toBe(false);
  });

  it('should update computed hasTrack when a track is selected', () => {
    expect(store.hasTrack()).toBe(false);

    store.play(mockTrack);

    expect(store.hasTrack()).toBe(true);
  });
});