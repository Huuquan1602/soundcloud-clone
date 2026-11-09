import { Component } from '@angular/core';
import {
  TrackCard,
  type Track,
} from '@soundcloud-clone/discover-ui';

import { MOCK_TRACKS } from './mock-tracks';

@Component({
  selector: 'lib-discover-feature',
  imports: [TrackCard],
  templateUrl: './discover-feature.html',
  styleUrl: './discover-feature.scss',
})
export class DiscoverFeature {
  readonly trendingTracks = MOCK_TRACKS.slice(0, 3);

  readonly recommendedTracks = MOCK_TRACKS.slice(3);

  onPlayTrack(track: Track): void {
    console.log('Play requested:', track);
  }
}

