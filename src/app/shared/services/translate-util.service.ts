import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class TranslateUtilService {
  private readonly KEY = 'LANG';
  private readonly DEF_LANG = 'en';
  private changeLangObservable: BehaviorSubject<any> = new BehaviorSubject<string>(this.getSavedLang());

  constructor(private _translateService: TranslateService) {
  }

  public setLanguage(lang: any): void {
    this._translateService.use(lang);
    localStorage.setItem(this.KEY, lang);
    this.changeLangObservable.next(lang);
  }
  public getCurrentLangObs(): Observable<any> {
    return this.changeLangObservable.asObservable();
  }

  public useSavedLang(): any {
    const savedLang: any = this.getSavedLang();
    this._translateService.use(savedLang);
    return savedLang;
  }

  public getSavedLang(): any {
    return localStorage.getItem(this.KEY) ? localStorage.getItem(this.KEY) : this.DEF_LANG;
  }

  public getDir(): any {
    return this.isArabic() ? 'rtl' : 'ltr';
  }

  public isArabic(): boolean {
    return this._translateService.currentLang == 'ar';
  }

  public isEnglish(): boolean {
    return this._translateService.currentLang == 'en';
  }

  public translateModel(model: any, lables: any): any {
    if (model) {
      return this.isEnglish() ? model[lables[0]] : model[lables[1]];
    }
    return '';
  }

  public translate(translationKeys: string[]): string {
    let totalTranslationKeysTexts: string = "";
    translationKeys.forEach((translateKey: string) => {
      totalTranslationKeysTexts += this._translateService.instant(translateKey) + " ";
    })
    return totalTranslationKeysTexts;
  }
  changeLang(lang: any) {
    this.setLanguage(lang);
    $(".preloader").css('display','block');
    setTimeout(() => {
      $(".preloader").fadeOut(500);
    },3000)
    setTimeout(() => {
      if (lang == "ar") {
        $("#bootstrap").attr("href", 'assets/vendors/bootstrap/css/bootstrap-rtl.min.css');
        $("#brote").attr("href", 'assets/css/brote-rtl.css');
        $("#brote-responsive").attr("href", 'assets/css/brote-responsive-rtl.css');
      } else if (lang == "en") {
        $("#bootstrap").attr("href", 'assets/vendors/bootstrap/css/bootstrap.min.css');
        $("#brote").attr("href", 'assets/css/brote.css');
        $("#brote-responsive").attr("href", 'assets/css/brote-responsive.css');
      }
    },400)
  }
}
