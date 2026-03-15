import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayHostComponent } from './overlay-host.component';

describe('OverlayHostComponent', () => {
  let component: OverlayHostComponent;
  let fixture: ComponentFixture<OverlayHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
