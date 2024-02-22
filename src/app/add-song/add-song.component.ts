import {Component, effect, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AuthorVO, SaveSong, TitleVO} from "../service/model/song.model";
import {SongService} from "../service/song.service";
import {Router} from "@angular/router";
import {ToastService} from "../service/toast.service";
import {CreateSongFormContent} from "./add-song-form.model";

type FlowStatus = 'init' | 'validation-file-error' | 'validation-cover-error' | 'success' | 'error';

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.scss'
})
export class AddSongComponent implements OnDestroy {

  public songToCreate: SaveSong = {};

  private formBuilder = inject(FormBuilder);

  private songService = inject(SongService);

  private router = inject(Router);

  private toastService = inject(ToastService);

  isCreating = false;

  flowStatus: FlowStatus = 'init';

  public createForm = this.formBuilder.nonNullable.group<CreateSongFormContent>({
    title: new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
    author: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    cover: new FormControl(null, {nonNullable: true, validators: [Validators.required]}),
    file: new FormControl(null, {nonNullable: true, validators: [Validators.required]}),
  });


  constructor() {
    effect(() => {
      this.isCreating = false;
      if(this.songService.addSig().status === "OK") {
        // this.songService.getAll();
        this.toastService.show('Song created with success', "SUCCESS");
        this.router.navigate(['/']);
      } else if (this.songService.addSig().status === "ERROR") {
        this.toastService.show('Error occured when creating song, please try again', "DANGER");
      }
    });
  }

  ngOnDestroy(): void {
    this.songService.reset();
  }

  create(): void {
    this.isCreating = true;

    if(this.songToCreate.file === null) {
      this.flowStatus = 'validation-file-error';
    }

    if(this.songToCreate.cover === null) {
      this.flowStatus = 'validation-cover-error';
    }

    const titleVO: TitleVO = {value: this.createForm.value.title};
    const authorVO: AuthorVO = {value: this.createForm.value.author};


    this.songToCreate.title = titleVO;
    this.songToCreate.author = authorVO;

    this.songService.add(this.songToCreate);
  }

  private extractFileFromTarget(target: EventTarget | null): File | null {
    const htmlInputTarget = target as HTMLInputElement;
    if(target === null || htmlInputTarget.files === null) {
      return null;
    }
    return htmlInputTarget.files[0];
  }

  onUploadCover(target: EventTarget | null) {
    const cover = this.extractFileFromTarget(target);
    if(cover !== null) {
      this.songToCreate.cover = cover;
      this.songToCreate.coverContentType = cover.type;
    }
  }

  onUploadFile(target: EventTarget | null) {
    const file = this.extractFileFromTarget(target);
    if(file !== null) {
      this.songToCreate.file = file;
      this.songToCreate.fileContentType = file.type;
    }
  }

}
