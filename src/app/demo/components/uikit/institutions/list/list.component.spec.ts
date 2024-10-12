import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstitionsComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListInstitionsComponent;
  let fixture: ComponentFixture<ListInstitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInstitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInstitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
