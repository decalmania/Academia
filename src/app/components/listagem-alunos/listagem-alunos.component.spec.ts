import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemAlunosComponent } from './listagem-alunos.component';
import { CommonModule } from '@angular/common';
import { AlunosService } from '../../services/alunos.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('ListagemAlunosComponent', () => {
  let componente: ListagemAlunosComponent;
  let fixture: ComponentFixture<ListagemAlunosComponent>;
  let alunosService: AlunosService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemAlunosComponent],
      imports: [CommonModule],
      providers: [
        AlunosService,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemAlunosComponent);
    componente = fixture.componentInstance;
    alunosService = TestBed.inject(AlunosService);
    router = TestBed.inject(Router);

    spyOn(alunosService, 'obterAlunos').and.returnValue(of([
        { Nome: 'Mari', Email: 'mari@test.com', DataNascimento: '1990-01-01', Sexo: 'F' },
        { Nome: 'Ju', Email: 'ju@test.com', DataNascimento: '1992-05-15', Sexo: 'F' }
      ] as any));

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(componente).toBeTruthy();
  });

  it('deve preencher a tabela com os dados dos alunos', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('table')).toBeTruthy();
    expect(compiled.querySelectorAll('tr').length).toBe(3);
    expect(compiled.querySelectorAll('td').length).toBe(10);
  });
});