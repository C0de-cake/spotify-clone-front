import {Injectable} from '@angular/core';
import {ToastInfo} from "./model/toast-info.model";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: ToastInfo[] = [];

  show(body: string, type: "SUCCESS" | "DANGER") {
    let className;
    if (type === "DANGER") {
      className = 'bg-danger text-light';
    } else {
      className = 'bg-success text-light';
    }
    const toastInfo: ToastInfo = {body, className};
    this.toasts.push(toastInfo);
  }

  constructor() {
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(toastToCompare => toastToCompare != toast);
  }
}
