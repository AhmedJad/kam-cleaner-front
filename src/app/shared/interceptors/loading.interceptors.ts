import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from 'rxjs/operators';
import { LoaderService } from "../services/loader.service";

declare var $: any;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loader: LoaderService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loader.showLoader();
        return next.handle(req).pipe(
            finalize(() => {
                this.loader.hideLoader();
            })
        )
    }
}