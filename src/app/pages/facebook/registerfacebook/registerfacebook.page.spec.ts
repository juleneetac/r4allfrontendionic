import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterfacebookPage } from './registerfacebook.page';

describe('RegisterfacebookPage', () => {
  let component: RegisterfacebookPage;
  let fixture: ComponentFixture<RegisterfacebookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterfacebookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterfacebookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
