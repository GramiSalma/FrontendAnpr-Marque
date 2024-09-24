import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectBrandComponent } from './detect-brand.component';

describe('DetectBrandComponent', () => {
  let component: DetectBrandComponent;
  let fixture: ComponentFixture<DetectBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetectBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetectBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
