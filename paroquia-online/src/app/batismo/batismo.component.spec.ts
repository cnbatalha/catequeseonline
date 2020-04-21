import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatismoComponent } from './batismo.component';

describe('BatismoComponent', () => {
  let component: BatismoComponent;
  let fixture: ComponentFixture<BatismoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatismoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
