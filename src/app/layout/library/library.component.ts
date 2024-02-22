import {Component, effect, inject, OnInit} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {SmallSongCardComponent} from "../../shared/small-song-card/small-song-card.component";
import {SongService} from "../../service/song.service";
import {ReadSong} from "../../service/model/song.model";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, SmallSongCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {

  private songService = inject(SongService);

  songs: Array<ReadSong> = [];

  constructor() {
    effect(() => {
      if(this.songService.getAllSig().status === "OK") {
        this.songs = this.songService.getAllSig().value!;
      }
    });
  }

  ngOnInit(): void {
    this.fetchSongs();
  }

  private fetchSongs() {
    this.songService.getAll();
  }
}
