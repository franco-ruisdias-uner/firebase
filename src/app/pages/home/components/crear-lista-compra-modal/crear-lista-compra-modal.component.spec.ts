import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearListaCompraModalComponent } from './crear-lista-compra-modal.component';

describe('CrearListaCompraModalComponent', () => {
  let component: CrearListaCompraModalComponent;
  let fixture: ComponentFixture<CrearListaCompraModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearListaCompraModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearListaCompraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
