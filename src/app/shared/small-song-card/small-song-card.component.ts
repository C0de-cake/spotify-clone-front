import {Component, input} from '@angular/core';
import {ReadSong} from "../../service/model/song.model";

@Component({
  selector: 'app-small-song-card',
  standalone: true,
  imports: [],
  templateUrl: './small-song-card.component.html',
  styleUrl: './small-song-card.component.scss'
})
export class SmallSongCardComponent {

  song = input.required<ReadSong>();

}
