import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheHistoriqueComponent } from './recherche-historique.component';

describe('RechercheHistoriqueComponent', () => {
  let component: RechercheHistoriqueComponent;
  let fixture: ComponentFixture<RechercheHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechercheHistoriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
