
import { Injectable } from '@angular/core';

interface SoundCloudWidget {
  load(url: string, options?: { auto_play?: boolean }): void;
  play(): void;
  pause(): void;
  seekTo(milliseconds: number): void;
  bind(event: string, listener: () => void): void;
  unbind(event: string): void;
}

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
  private ready = false;
  private pendingUrl: string | null = null;

  initialize(
    iframe: HTMLIFrameElement,
    onReady?: () => void
  ): void {
    if (!window.SC) {
      throw new Error('SoundCloud Widget SDK is not loaded');
    }

    this.widget = window.SC.Widget(iframe);

    this.widget.bind(window.SC.Widget.Events.READY, () => {
      this.ready = true;

      console.log('SoundCloud Widget is ready!');

      onReady?.();

      if (this.pendingUrl) {
        const url = this.pendingUrl;
        this.pendingUrl = null;
        this.load(url);
      }
    });
  }

  load(url: string): void {
    if (!this.widget || !this.ready) {
      this.pendingUrl = url;
      return;
    }

    this.widget.load(url, {
      auto_play: true,
    });
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
