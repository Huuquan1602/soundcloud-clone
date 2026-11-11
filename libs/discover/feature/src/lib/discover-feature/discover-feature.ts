
import { Component, inject } from '@angular/core';
import { TrackCard } from '@soundcloud-clone/discover-ui';
import { PlayerStore } from '@soundcloud-clone/player-data-access';
import type { Track } from '@soundcloud-clone/shared-models';

import { MOCK_TRACKS } from './mock-tracks';

@Component({
  selector: 'lib-discover-feature',
  imports: [TrackCard],
  templateUrl: './discover-feature.html',
  styleUrl: './discover-feature.scss',
})
export class DiscoverFeature {
  private readonly playerStore = inject(PlayerStore);

  readonly trendingTracks = MOCK_TRACKS.slice(0, 3);

  readonly recommendedTracks = MOCK_TRACKS.slice(3);

  onPlayTrack(track: Track): void {
    this.playerStore.play(track);
  }
}
