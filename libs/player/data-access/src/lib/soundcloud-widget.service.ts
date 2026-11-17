
import { Injectable } from '@angular/core';

// Represents the SoundCloud player instance
interface SoundCloudWidget {
  load(url: string, options?: { auto_play?: boolean }): void;
  play(): void;
  pause(): void;
  seekTo(milliseconds: number): void;
  bind(event: string, listener: () => void): void;
  unbind(event: string): void;
}

// Represents the global SoundCloud SDK
interface SoundCloudAPI {
  Widget: {
    (iframe: HTMLIFrameElement): SoundCloudWidget;
    Events: {
      READY: string;
      PLAY: string;
      PAUSE: string;
      FINISH: string;
      ERROR: string;
    };
  };
}

declare global {
  interface Window {
    SC?: SoundCloudAPI;
  }
}

@Injectable({
  providedIn: 'root',
})
export class SoundCloudWidgetService {
  private widget: SoundCloudWidget | null = null;

  initialize(iframe: HTMLIFrameElement): void {
    if (!window.SC) {
      throw new Error('SoundCloud Widget SDK is not loaded');
    }

    this.widget = window.SC.Widget(iframe);

    this.widget.bind(window.SC.Widget.Events.READY, () => {
      console.log('SoundCloud Widget is ready!');
    });
  }

  load(url: string): void {
    if (!this.widget) {
      throw new Error('SoundCloud Widget is not initialized');
    }

    this.widget.load(url, { auto_play: false });
  }

  play(): void {
    this.widget?.play();
  }

  pause(): void {
    this.widget?.pause();
  }

  seekTo(milliseconds: number): void {
    this.widget?.seekTo(milliseconds);
  }
}
