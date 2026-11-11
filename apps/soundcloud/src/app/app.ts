import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { PlayerFeature } from '@soundcloud-clone/player-feature';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, PlayerFeature],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

