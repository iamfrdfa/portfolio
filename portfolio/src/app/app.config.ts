import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Entscheide dich für EINEN Pfad: './i18n/' ODER './lang/'.
// Ich nehme hier './i18n/' – ändere das ggf. auf './lang/' wenn deine Dateien dort liegen.
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './lang/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),

        provideHttpClient(),

        provideRouter(routes, withComponentInputBinding()),

        importProvidersFrom(
            TranslateModule.forRoot({
                defaultLanguage: 'de', // oder 'en' – aber NUR EINMAL zentral festlegen
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            })
        ),
    ],
};
