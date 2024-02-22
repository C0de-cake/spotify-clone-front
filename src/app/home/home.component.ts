import {Component, effect, inject, OnInit} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SongCardComponent} from "./song-card/song-card.component";
import {SongService} from "../service/song.service";
import {ToastService} from "../service/toast.service";
import {ReadSong} from "../service/model/song.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FontAwesomeModule,
    SongCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private songService = inject(SongService);
  private toastService = inject(ToastService);

  allSongs: Array<ReadSong> | undefined;

  constructor() {
    effect(() => {
      const allSongsResponse = this.songService.getAllSig();
      if(allSongsResponse.status === "OK") {
        this.allSongs = allSongsResponse.value;
      } else if (allSongsResponse.status === "ERROR") {
        this.toastService.show('An error occured when fetching all songs', "DANGER");
      }
    });
  }

  ngOnInit(): void {
    this.songService.getAll();
  }



}
