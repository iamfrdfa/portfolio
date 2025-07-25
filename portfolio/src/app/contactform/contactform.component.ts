import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-contactform',
    imports: [FormsModule],
    templateUrl: './contactform.component.html',
    styleUrl: './contactform.component.scss'
})
export class ContactformComponent {
    http = inject(HttpClient);

    // The contact form component
    // contactData is the model for the form
    contactData = {
        name: "",
        email: "",
        message: ""
    }

    mailTest = true;

    post = {
        endPoint: 'https://deineDomain.de/sendMail.php',
        body: (payload: any) => JSON.stringify(payload),
        options: {
            headers: {
                'Content-Type': 'text/plain',
                responseType: 'text',
            },
        },
    };

    onSubmit(ngForm: NgForm) {
        if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
            this.http
                .post(this.post.endPoint, this.post.body(this.contactData))
                .subscribe({
                    next: (response) => {

                        ngForm.resetForm();
                    },
                    error: (error) => {
                        console.error(error);
                    },
                    complete: () => console.info('send post complete'),
                });
        } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {

            ngForm.resetForm();
        }
    }
}
