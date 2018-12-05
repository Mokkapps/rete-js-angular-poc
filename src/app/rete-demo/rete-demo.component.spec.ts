import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReteDemoComponent } from './rete-demo.component';

describe('ReteDemoComponent', () => {
  let component: ReteDemoComponent;
  let fixture: ComponentFixture<ReteDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReteDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
