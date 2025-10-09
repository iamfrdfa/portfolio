import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-contactform',
    standalone: true,
    imports: [FormsModule],
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

    // Form-Model
    contactData = {
        name: '',
        email: '',
        message: ''
    };

    // Endpoint + Optionen
    post = {
        endPoint: 'https://deineDomain.de/sendMail.php',
        body: (payload: any) => JSON.stringify(payload),
        options: {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'text' as const // Server gibt Text zurück
        }
    };

    // Button nur aktiv, wenn nicht sending
    canSubmit = computed(() => !this.sending());
    consent: boolean = false; // public

    onSubmit(ngForm: NgForm) {
        this.sentOk.set(false);
        this.sentError.set(null);

        this.consent = false; // Einwilligung (Checkbox-DSGVO) - muss true sein
        // Verhindere Spam (Honeypot) & ungültige Submits
        if (!ngForm.submitted || !ngForm.form.valid || this.honeypot.trim().length > 0) {
            return;
        }

        // + consent check (required)
        if (!ngForm.submitted || !ngForm.form.valid || !this.consent || this.honeypot.trim().length > 0) {
            return;
        }

        if (this.mailTest) {
            // Simulierter Erfolg
            this.sending.set(true);
            setTimeout(() => {
                this.sending.set(false);
                this.sentOk.set(true);
                ngForm.resetForm();
            }, 700);
            return;
        }

        // Echter Versand
        this.sending.set(true);
        this.http
            .post(this.post.endPoint, this.post.body(this.contactData), this.post.options)
            .subscribe({
                next: () => {
                    this.sending.set(false);
                    this.sentOk.set(true);
                    ngForm.resetForm();
                },
                error: (err) => {
                    this.sending.set(false);
                    this.sentError.set(
                        (err?.error && typeof err.error === 'string') ? err.error : 'Senden fehlgeschlagen. Bitte später erneut versuchen.'
                    );
                    console.error('Mail send error:', err);
                },
                complete: () => console.info('send post complete')
            });
    }
}
