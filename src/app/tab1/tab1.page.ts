import { Component } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public title: string;
  public title_2: string;
  public description: string;
  public name: string;
  public language: string;

  constructor(private globalization: Globalization, private _translate: TranslateService) {}

  // On page load, we check if we have default browser internationalization API
  ionViewDidEnter(): void {
    this.getDeviceLanguage()
  }

  /**
   * IMPORTANT: 
   * - Use .subscribe() function from translateService to asynchronously fetch trasnlation
   * no need to use timeouts 
   * - get() is the function to fetch translations
   * - TITLE is the key to search for in the JSON file. If the date is in a nested JSON, then we use
   * the dot notation to fetch. e.g. "data.name"
   * 
   */
  _initialiseTranslation(): void {
    this._translate.get('TITLE').subscribe((res: string) => {
      this.title = res;
    });
    this._translate.get('description').subscribe((res: string) => {
      this.description = res;
    });
    this._translate.get('TITLE_2', { value: 'John' }).subscribe((res: string) => {
      this.title_2 = res;
    });
    this._translate.get('data.name', { name_value: 'Marissa Mayer' }).subscribe((res: string) => {
      this.name = res;
    });

  }

  /**
   * Function to change the app language, it is called from user action.
   */
  public changeLanguage(): void {
    this._translateLanguage();
  }



  /**
   * Start the translation
   */
  _translateLanguage(): void {
    /**
     * It indicates to the translation service which language to use to translate
     */
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  /**
   * Establecemos el lenguage inicial de la app 
   * @param language 
   */
  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('en');
    if (language) {
      this.language = language;
    }
    else {
      // Set your language here in case we don't have translations for browser language
      this.language = 'en';
    }
    this._translateLanguage();
  }

  /**
   * Function to get the default wrobser language
   */
  getDeviceLanguage() {
    /**
     * window.Intl checks if we have default browser internationalization API
     */
    if (window.Intl && typeof window.Intl === 'object') {
      // We get the default browser language
      this._initTranslate(navigator.language) 
    }
    else {
      /**
       * We set a fallback on Cordova Globalization Plugin (deprecated) and set the 
       * default language if neither browser nor Cordova plugin works
       */
      this.globalization.getPreferredLanguage()
        .then(res => {
          this._initTranslate(res.value)
        })
        .catch(e => {console.log(e);});
    }
  }
}
