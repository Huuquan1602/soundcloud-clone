import { Injectable, computed, signal } from '@angular/core';
import type { Track } from '@soundcloud-clone/shared-models';

@Injectable({ providedIn: 'root' })
export class PlayerStore {
  private readonly _currentTrack = signal<Track | null>(null);
  private readonly _isPlaying = signal(false);

  readonly currentTrack = this._currentTrack.asReadonly();
  readonly isPlaying = this._isPlaying.asReadonly();
  readonly hasTrack = computed(() => this._currentTrack() !== null);

  play(track: Track): void {
    this._currentTrack.set(track);
    this._isPlaying.set(true);
  }

  pause(): void {
    this._isPlaying.set(false);
  }

  resume(): void {
    if (this._currentTrack()) this._isPlaying.set(true);
  }

  togglePlay(): void {
    if (!this._currentTrack()) return;
    this._isPlaying.update(value => !value);
  }
}