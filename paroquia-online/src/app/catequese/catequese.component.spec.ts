import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatequeseComponent } from './catequese.component';

describe('CatequeseComponent', () => {
  let component: CatequeseComponent;
  let fixture: ComponentFixture<CatequeseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatequeseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatequeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
