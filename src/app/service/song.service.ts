import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SaveSong} from "./model/song.model";
import {State} from "./model/state.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  http = inject(HttpClient);

  private add$: WritableSignal<State<SaveSong, HttpErrorResponse>> =
    signal(State.Builder<SaveSong, HttpErrorResponse>().forInit().build());
  addSig = computed(() => this.add$());

  add(song: SaveSong): void {
    const formData = new FormData();
    formData.append('cover', song.cover!);
    formData.append('file', song.file!);
    const clone = structuredClone(song);
    clone.file = undefined;
    clone.cover = undefined;
    formData.append('dto', JSON.stringify(clone));
    this.http.post<SaveSong>(`${environment.API_URL}/api/songs`, formData)
      .subscribe({
        next: savedSong => this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forSuccess(savedSong).build()),
        error: err => this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forError(err).build())
      })
  }

  reset(): void {
    this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forInit().build());
  }

  constructor() { }
}
