import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdottoComponent } from './lista-prodotto.component';

describe('ListaProdottoComponent', () => {
  let component: ListaProdottoComponent;
  let fixture: ComponentFixture<ListaProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProdottoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
