import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-contactform',
    standalone: true,
    imports: [FormsModule, TranslateModule, ReactiveFormsModule, CommonModule, NgIf],
    templateUrl: './contactform.component.html',
    styleUrl: './contactform.component.scss'
})
export class ContactformComponent {

    private http = inject(HttpClient);

    // ========== CONFIG ==========
    // Auf dem Server: mailTest = false
    mailTest = false;

    // ========== UI STATE ==========
    sending = signal(false);
    sentOk = signal(false);
    sentError = signal<string | null>(null);

    // Spam-Honeypot
    honeypot = '';

    // DSGVO-Checkbox
    consent = false;

    // Form-Daten
    contactData = { name: '', email: '', message: '' };

    // Backend-Config (Akademie-Vorgabe)
    post = {
        endPoint: 'https://faraji.dev/sendMail.php',
        body: (payload: any) => JSON.stringify(payload),
        options: {
            headers: new HttpHeaders({
                'Content-Type': 'text/plain' // genau so verlangt es die Akademie
            }),
            responseType: 'text' as const
        }
    };

    canSubmit = computed(() => !this.sending());

    // ========== SUBMIT LOGIK ==========
    onSubmit(ngForm: NgForm) {

        this.sentOk.set(false);
        this.sentError.set(null);

        // Grundprüfungen
        if (!ngForm.form.valid || !this.consent || this.honeypot.trim().length > 0) {
            return;
        }

        // TEST-MODE (lokal)
        if (this.mailTest) {
            console.warn('MAILTEST = TRUE → Es wird keine echte E-Mail gesendet.');
            this.sending.set(true);
            setTimeout(() => {
                this.sending.set(false);
                this.sentOk.set(true);
                ngForm.resetForm();
            }, 800);
            return;
        }

        // ECHTER SENDEN
        this.sending.set(true);

        this.http.post(
            this.post.endPoint,
            this.post.body(this.contactData),
            this.post.options
        ).subscribe({
            next: () => {
                this.sending.set(false);
                this.sentOk.set(true);
                ngForm.resetForm();
            },
            error: (error) => {
                this.sending.set(false);
                this.sentError.set('Die Nachricht konnte nicht gesendet werden.');
                console.error('Mail send error:', error);
            }
        });
    }

    scrollToName(el: HTMLInputElement) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => el.focus(), 400);
    }
}
