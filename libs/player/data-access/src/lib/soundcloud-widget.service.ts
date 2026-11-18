
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

      console.log('[SoundCloud] Widget READY');

      onReady?.();

      if (this.pendingUrl) {
        const url = this.pendingUrl;
        this.pendingUrl = null;
        this.load(url);
      }
    });

    this.widget.bind(window.SC.Widget.Events.PLAY, () => {
      console.log('[SoundCloud] PLAY event');
    });

    this.widget.bind(window.SC.Widget.Events.PAUSE, () => {
      console.log('[SoundCloud] PAUSE event');
    });

    this.widget.bind(window.SC.Widget.Events.FINISH, () => {
      console.log('[SoundCloud] FINISH event');
    });

    this.widget.bind(window.SC.Widget.Events.ERROR, () => {
      console.error('[SoundCloud] ERROR event');
    });
  }

  load(url: string): void {
    console.log('[SoundCloud] Requested track:', url);

    if (!this.widget || !this.ready) {
      console.log('[SoundCloud] Widget not ready, queueing track');
      this.pendingUrl = url;
      return;
    }

    console.log('[SoundCloud] Loading track');

    this.widget.load(url, {
      auto_play: false,
    });
  }

  play(): void {
    if (!this.widget || !this.ready) {
      console.warn('[SoundCloud] Cannot play: widget not ready');
      return;
    }

    console.log('[SoundCloud] Calling play()');
    this.widget.play();
  }

  pause(): void {
    if (!this.widget || !this.ready) {
      return;
    }

    console.log('[SoundCloud] Calling pause()');
    this.widget.pause();
  }

  seekTo(milliseconds: number): void {
    this.widget?.seekTo(milliseconds);
  }
}
