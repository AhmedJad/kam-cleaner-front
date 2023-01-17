import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loaderVisibility = new BehaviorSubject(false);
  loaderVisibility = this._loaderVisibility.asObservable();

  constructor() { }

  showLoader() {
    this._loaderVisibility.next(true);
  }
  hideLoader() {
    this._loaderVisibility.next(false);
  }
}
