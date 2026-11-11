import { Component, input, output } from '@angular/core';
import type { Track } from '@soundcloud-clone/shared-models';

@Component({
  selector: 'lib-player-controls',
  templateUrl: './player-controls.html',
  styleUrl: './player-controls.scss',
})
export class PlayerControls {
  readonly track = input<Track | null>(null);
  readonly isPlaying = input(false);

  readonly togglePlay = output<void>();
}