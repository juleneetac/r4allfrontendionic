import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartidasPage } from './partidas.page';

describe('PartidasPage', () => {
  let component: PartidasPage;
  let fixture: ComponentFixture<PartidasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartidasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
