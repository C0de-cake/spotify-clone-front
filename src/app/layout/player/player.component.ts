import {Component, effect, inject} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {SmallSongCardComponent} from "../../shared/small-song-card/small-song-card.component";
import {SongContentService} from "../../service/song-content.service";
import {ReadSong, SongContent} from "../../service/model/song.model";
import {Howl} from "howler";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    SmallSongCardComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  songContentService = inject(SongContentService);

  public currentSong: SongContent | undefined = undefined;
  currentHowlInstance: Howl | undefined;

  isPlaying: boolean = false;
  currentVolume = 0.5;
  isMuted = false;

  private nextQueue: Array<SongContent> = [];
  private previousQueue: Array<SongContent> = [];

  constructor() {
    effect(() => {
      const newQueue = this.songContentService.queueToPlay();
      if (newQueue.length > 0) {
        this.onNewQueue(newQueue);
      }
    });

    effect(() => {
      if (this.songContentService.playNewSong().status === "OK") {
        this.onNextSong();
      }
    });
  }


  private onNewQueue(newQueue: Array<ReadSong>): void {
    this.nextQueue = newQueue;
    this.playNextSongInQueue();
  }

  private playNextSongInQueue(): void {
    if (this.nextQueue.length > 0) {
      this.isPlaying = false;
      if (this.currentSong) {
        this.previousQueue.unshift(this.currentSong);
      }
      const nextSong = this.nextQueue.shift();
      this.songContentService.fetchNextSong(nextSong!);
    }
  }

  private onNextSong(): void {
    this.currentSong = this.songContentService.playNewSong().value!;
    const newHowlInstance = new Howl({
      src: [`data:${this.currentSong.fileContentType};base64,${this.currentSong.file}`],
      volume: this.currentVolume,
      onplay: () => this.onPlay(),
      onpause: () => this.onPause(),
      onend: () => this.onEnd()
    });

    if (this.currentHowlInstance) {
      this.currentHowlInstance.stop();
    }

    newHowlInstance.play();
    this.currentHowlInstance = newHowlInstance;
  }

  private onPlay(): void {
    this.isPlaying = true;
  }

  private onPause(): void {
    this.isPlaying = false;
  }

  private onEnd(): void {
    this.playNextSongInQueue();
    this.isPlaying = false;
  }

  onForward(): void {
    this.playNextSongInQueue();
  }

  onBackward(): void {
    if (this.previousQueue.length > 0) {
      this.isPlaying = false;
      if (this.currentSong) {
        this.nextQueue.unshift(this.currentSong!);
      }
      const previousSong = this.previousQueue.shift();
      this.songContentService.fetchNextSong(previousSong!);
    }
  }

  pause(): void {
    if (this.currentHowlInstance) {
      this.currentHowlInstance.pause();
    }
  }

  play(): void {
    if (this.currentHowlInstance) {
      this.currentHowlInstance.play();
    }
  }

  onMute(): void {
    if (this.currentHowlInstance) {
      this.isMuted = !this.isMuted;
      this.currentHowlInstance.mute(this.isMuted);
      if (this.isMuted) {
        this.currentVolume = 0;
      } else {
        this.currentVolume = 0.5;
        this.currentHowlInstance.volume(this.currentVolume);
      }
    }
  }

  onVolumeChange(newVolume: number): void {
    this.currentVolume = newVolume / 100;
    if (this.currentHowlInstance) {
      this.currentHowlInstance.volume(this.currentVolume);
      if (this.currentVolume === 0) {
        this.isMuted = true;
        this.currentHowlInstance.mute(this.isMuted);
      } else if (this.isMuted) {
        this.isMuted = false;
        this.currentHowlInstance.mute(this.isMuted);
      }
    }
  }

}
