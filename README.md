<!-- Copy and paste the converted output. -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.455 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Wed Aug 12 2020 03:47:15 GMT-0700 (PDT)
* Source doc: Processes to translate an Ionic App
----->


**Steps involved in the process of translate an Ionic App**



1. Translation Language
    1. Detect the language you want to translate into.
    2. It can either be done automatically by detecting phone or browser’s language (Globalization)
    3. It can be done with user actions( dropwon, buttons,...)
    4. For this case, we will detect device’s language using both:
        1. Cordova globalization plugin
        2. Browser’s internationalization API
2. Prepare Language Text
    5. We need to have a pre-translated dictionary (Json file) which stores the translations 
    6. We can use this url to translate our json files
        3. [https://www.logisticinfotech.com/translate-language-files-online-json/](https://www.logisticinfotech.com/translate-language-files-online-json/)
3. Translate
    7. We will use ngx-translate library for translating our texts

**Development**



1. **Create a starter Ionic 5 tab app**
    1. ionic start ionicTranslate tabs --type=angular --cordova
        1. with --cordova we tell the CLI to integrate cordova in the app
2. **Prepare multiple language Json files in assets**
    2. We will create these Json files in “src/assets/i18n” folder
    3. Note for the json files for the example:
        2. The {{ value }} and {{ name_value }} are kind of variable/constants we can pass from our component.
3. **Implement ngx-transtale library and Cordova Globalization Plugin**
    4. Cordova plugin is used to detect device’s default language/locale, Unfortunately, this plugin is deprecated, but still supported by Ionic
    5. However, the latest way of detecting the language / locale of the browser is by using browser’s default internationalization API
        3. [https://cordova.apache.org/news/2017/11/20/migrate-from-cordova-globalization-plugin.html](https://cordova.apache.org/news/2017/11/20/migrate-from-cordova-globalization-plugin.html)
    6. We install Cordova globalization plugin using
        4. ionic cordova plugin add cordova-plugin-globalization
        5. npm install @ionic-native/globalization
    7. We install ngx-translate library
        6. npm install --save @ngx-translate/core
        7. npm install @ngx-translate/http-loader --save
            1. http-loader is used for loading the translation json files via Angular’s HttpClient module.
    8. We need to define a function that loads the external json files to the app using http-loader. It is in the app.module.ts
        8. export function HttpLoaderFactory(http: HttpClient) { return new TranslateHttpLoader(http, "./assets/i18n/", ".json"); }
        9. Pay attention to TranslateModule.forRoot() , is definded in case of a Tabbed aplicateion, or general non lazy-loaded module. For a tab child, however, we will have to use TranslateModule.forChild().
    9. Import and setup the translate library in child component.
        10. in “src/app/tab1”
4. **The Directive**
    10. to use the directive like this
        11. &lt;h1 translate>TITLE&lt;/h1>&lt;p [translate]="'description'">&lt;/p>
    11. we need to import the translation module in child modules as well for everything to work correctly.
    12. It wll be in “tab1.module.ts”
5. **Setup stand alone translations**
    13. The process of setting up separate language files in “assets” for each language is the standard way of translation in Angular. But sometimes it becomes a little cumbersome, especially when don’t have that much data to translate
    14. Quick translation in tab2.page
        12. We can declare the variables in the component itself instead of reading from the JSON files from “assets”
        13. tab2.html is similar to tab2.html and the same to tab2.scss and 
        14. We make changes in tab2.ts constructor

Source: [https://enappd.com/blog/how-to-translate-in-ionic-internationalization-and-localization/143/](https://enappd.com/blog/how-to-translate-in-ionic-internationalization-and-localization/143/)
