import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CafeComponent } from './cafe.component';
import { CafeService } from './cafe.service';
import { of } from 'rxjs';
import { Cafe } from './cafe';

describe('CafeComponent', () => {
  let component: CafeComponent;
  let fixture: ComponentFixture<CafeComponent>;
  let cafeServiceSpy: jasmine.SpyObj<CafeService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CafeService', ['getCafes']);
    
    TestBed.configureTestingModule({
      declarations: [CafeComponent],
      providers: [{ provide: CafeService, useValue: spy }]
    });
    
    cafeServiceSpy = TestBed.inject(CafeService) as jasmine.SpyObj<CafeService>;
    fixture = TestBed.createComponent(CafeComponent);
    component = fixture.componentInstance;
  });

  it('should render more than one coffee', fakeAsync(() => {
    const mockCafes: Cafe[] = [
      { nombre: 'Coffee1', tipo: 'Café1', region: 'Region1' },
      { nombre: 'Coffee2', tipo: 'Café2', region: 'Region2' },
      { nombre: 'Coffee3', tipo: 'Café3', region: 'Region3' }
    ] as Cafe[];

    cafeServiceSpy.getCafes.and.returnValue(of(mockCafes));
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('tbody tr');

    expect(rows.length).toBe(3);

    expect(rows[0].textContent).toContain('1');
    expect(rows[0].textContent).toContain('Coffee1');
    expect(rows[0].textContent).toContain('Café1');
    expect(rows[0].textContent).toContain('Region1');

    expect(rows[1].textContent).toContain('2');
    expect(rows[1].textContent).toContain('Coffee2');
    expect(rows[1].textContent).toContain('Café2');
    expect(rows[1].textContent).toContain('Region2');

    expect(rows[2].textContent).toContain('3');
    expect(rows[2].textContent).toContain('Coffee3');
    expect(rows[2].textContent).toContain('Café3');
    expect(rows[2].textContent).toContain('Region3');
  }));
});
