import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-favorite-song-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './favorite-song-card.component.html',
  styleUrl: './favorite-song-card.component.scss'
})
export class FavoriteSongCardComponent {

}
