
import { Component, input, output } from '@angular/core';
import type { Track } from '@soundcloud-clone/shared-models';

@Component({
  selector: 'lib-track-card',
  imports: [],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
})
export class TrackCard {
  readonly track = input.required<Track>();

  readonly play = output<Track>();

  onPlay(): void {
    this.play.emit(this.track());
  }
}

