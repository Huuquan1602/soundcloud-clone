import { Component, inject } from '@angular/core';
import { PlayerStore } from '@soundcloud-clone/player-data-access';
import { PlayerControls } from '@soundcloud-clone/player-ui';

@Component({
  selector: 'lib-player-feature',
  imports: [PlayerControls],
  templateUrl: './player-feature.html',
  styleUrl: './player-feature.scss',
})
export class PlayerFeature {
  readonly playerStore = inject(PlayerStore);
}
