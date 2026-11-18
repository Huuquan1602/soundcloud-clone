
import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

import {
  PlayerStore,
  SoundCloudWidgetService,
} from '@soundcloud-clone/player-data-access';

import { PlayerControls } from '@soundcloud-clone/player-ui';

@Component({
  selector: 'lib-player-feature',
  imports: [PlayerControls],
  templateUrl: './player-feature.html',
  styleUrl: './player-feature.scss',
})
export class PlayerFeature {
  readonly playerStore = inject(PlayerStore);

  private readonly widgetService = inject(SoundCloudWidgetService);

  private readonly soundcloudIframe =
    viewChild.required<ElementRef<HTMLIFrameElement>>('soundcloudIframe');

  private widgetReady = false;
  private pendingTrackUrl: string | null = null;

  constructor() {
    effect(() => {
      const track = this.playerStore.currentTrack();
      const url = track?.soundcloudUrl;

      if (!url) {
        return;
      }

      if (!this.widgetReady) {
        this.pendingTrackUrl = url;
        return;
      }

      this.widgetService.load(url);
    });

    afterNextRender(() => {
      const iframe = this.soundcloudIframe().nativeElement;

      this.widgetService.initialize(iframe, () => {
        this.widgetReady = true;

        if (this.pendingTrackUrl) {
          this.widgetService.load(this.pendingTrackUrl);
          this.pendingTrackUrl = null;
        }
      });
    });
  }

  onTogglePlay(): void {
    if (!this.playerStore.hasTrack()) {
      return;
    }

    if (this.playerStore.isPlaying()) {
      this.widgetService.pause();
      this.playerStore.pause();
    } else {
      this.widgetService.play();
      this.playerStore.resume();
    }
  }
}
