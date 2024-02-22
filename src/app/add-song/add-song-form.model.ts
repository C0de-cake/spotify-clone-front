import {FormControl} from "@angular/forms";

export type CreateSongFormContent = {
  title: FormControl<string>;
  author: FormControl<string>;
  cover: FormControl<File | null>;
  file: FormControl<File | null>;
}
