import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DizimoCadComponent } from './dizimo-cad.component';

describe('DizimoCadComponent', () => {
  let component: DizimoCadComponent;
  let fixture: ComponentFixture<DizimoCadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DizimoCadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DizimoCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
