
import {
  afterNextRender,
  Component,
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

  constructor() {
    afterNextRender(() => {
      const iframe = this.soundcloudIframe().nativeElement;

      this.widgetService.initialize(iframe);
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
