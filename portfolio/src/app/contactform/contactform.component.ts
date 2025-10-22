import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, NgIf } from '@angular/common'; // ← hinzufügen

@Component({
    selector: 'app-contactform',
    standalone: true,
    imports: [FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, NgIf],
    templateUrl: './contactform.component.html',
    styleUrl: './contactform.component.scss'
})
export class ContactformComponent {
    private http = inject(HttpClient);

    // Schalte auf false für “echtes” Senden
    mailTest = true;

    // UI-State
    sending = signal(false);
    sentOk = signal(false);
    sentError = signal<string | null>(null);

    // Spam-Honeypot (soll leer bleiben)
    honeypot = '';

    // DSGVO-Checkbox
    consent: boolean = false;

    // Form-Model
    contactData = { name: '', email: '', message: '' };

    // Endpoint + Optionen
    post = {
        endPoint: 'https://deineDomain.de/sendMail.php',
        body: (payload: any) => JSON.stringify(payload),
        options: {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            responseType: 'text' as const
        }
    };

    // Button nur aktiv, wenn nicht sending
    canSubmit = computed(() => !this.sending());

    onSubmit(ngForm: NgForm) {
        this.sentOk.set(false);
        this.sentError.set(null);

        // Ungültig / Honeypot / fehlende Einwilligung -> abbrechen
        if (!ngForm.form.valid || !this.consent || this.honeypot.trim().length > 0) return;

        if (this.mailTest) {
            this.sending.set(true);
            setTimeout(() => {
                this.sending.set(false);
                this.sentOk.set(true);
                ngForm.resetForm();
            }, 700);
            return;
        }

        this.sending.set(true);
        this.http.post(this.post.endPoint, this.post.body(this.contactData), this.post.options).subscribe({
            next: () => {
                this.sending.set(false);
                this.sentOk.set(true);
                ngForm.resetForm();
            },
            error: (err) => {
                this.sending.set(false);
                this.sentError.set(
                    (err?.error && typeof err.error === 'string')
                        ? err.error
                        : null // -> Fallback-Text kommt aus i18n im Template
                );
                console.error('Mail send error:', err);
            }
        });
    }

    scrollToName(el: HTMLInputElement) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => el.focus(), 400);
    }
}
