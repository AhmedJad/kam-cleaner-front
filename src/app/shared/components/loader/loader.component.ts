import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private unsubscribeAll = new Subject();
  showLoader = false;
  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.loaderVisibility.pipe(takeUntil(this.unsubscribeAll))
      .subscribe((showLoader) => {
        this.showLoader = showLoader;
      })
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
