import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactformComponent } from './contactform.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('ContactformComponent', () => {
    let component: ContactformComponent;
    let fixture: ComponentFixture<ContactformComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactformComponent, HttpClientTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactformComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('submit button should be disabled initially', () => {
        const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
        expect(btn.disabled).toBeTrue();
    });

    it('form becomes valid with proper inputs', async () => {
        component.contactData = {
            name: 'Max',
            email: 'max@example.com',
            message: 'Das ist eine valide Nachricht.'
        };
        fixture.detectChanges();
        await fixture.whenStable();
        const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
        expect(btn.disabled).toBeFalse();
    });
});
