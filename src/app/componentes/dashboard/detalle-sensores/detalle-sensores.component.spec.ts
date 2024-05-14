import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSensoresComponent } from './detalle-sensores.component';

describe('DetalleSensoresComponent', () => {
  let component: DetalleSensoresComponent;
  let fixture: ComponentFixture<DetalleSensoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleSensoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
