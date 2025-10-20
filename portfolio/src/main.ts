import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// ▼ Loader: lädt JSONs aus /lang (zur Laufzeit erreichbar unter http://localhost:4200/lang/*.json)
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './lang/', '.json');
}

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        ...(appConfig.providers ?? []),
        provideHttpClient(),
        provideRouter(routes, withComponentInputBinding()),
        importProvidersFrom(
            TranslateModule.forRoot({
                defaultLanguage: 'en',
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            })
        ),
    ],
}).catch((err) => console.error(err));
