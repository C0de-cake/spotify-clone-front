import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SmallSongCardComponent} from "../shared/small-song-card/small-song-card.component";
import {SongService} from "../service/song.service";
import {SongContentService} from "../service/song-content.service";
import {ToastService} from "../service/toast.service";
import {ReadSong} from "../service/model/song.model";
import {debounce, filter, interval, of, switchMap, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {State} from "../service/model/state.model";
import {FavoriteSongBtnComponent} from "../shared/favorite-song-btn/favorite-song-btn.component";

@Component({
    selector: 'app-search',
    standalone: true,
  imports: [
    FormsModule,
    FontAwesomeModule,
    SmallSongCardComponent,
    FavoriteSongBtnComponent
  ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {

    searchTerm = '';

    private songService = inject(SongService);
    private songContentService = inject(SongContentService);
    private toastService = inject(ToastService);

    songsResult: Array<ReadSong> = [];

    isSearching = false;

    onSearch(newSearchTerm: string) {
        this.searchTerm = newSearchTerm;
        of(newSearchTerm).pipe(
            tap(newSearchTerm => this.resetResultIfEmptyTerm(newSearchTerm)),
            filter(newSearchTerm => newSearchTerm.length > 0),
            debounce(() => interval(300)),
            tap(() => this.isSearching = true),
            switchMap(newSearchTerm => this.songService.search(newSearchTerm))
        ).subscribe({
            next: searchState => this.onNext(searchState)
        })
    }

    private resetResultIfEmptyTerm(newSearchTerm: string) {
        if (newSearchTerm.length === 0) {
            this.songsResult = [];
        }
    }

    onPlay(firstSong: ReadSong) {
        this.songContentService.createNewQueue(firstSong, this.songsResult);
    }

    private onNext(searchState: State<Array<ReadSong>, HttpErrorResponse>) {
        this.isSearching = false;
        if(searchState.status === "OK") {
            this.songsResult = searchState.value!;
        } else if (searchState.status === "ERROR") {
            this.toastService.show('An error occured while searching', "DANGER");
        }
    }
}
