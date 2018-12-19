import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidcontainerComponent } from './midcontainer.component';

describe('MidcontainerComponent', () => {
  let component: MidcontainerComponent;
  let fixture: ComponentFixture<MidcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
