import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioComponent } from './formulario.component';
import { AlunosService } from '../../services/alunos.service';
import { of } from 'rxjs';

describe('FormularioComponent', () => {
  let componente: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let alunosService: AlunosService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        AlunosService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    componente = fixture.componentInstance;
    alunosService = TestBed.inject(AlunosService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(componente).toBeTruthy();
  });

  it('deve inicializar o formulário', () => {
    expect(componente.formulario).toBeDefined();
  });

  it('deve preencher o formulário para editar', () => {
    spyOn(alunosService, 'obterAlunoPorIndex').and.returnValue({ 
        nome: 'Teste', 
        email: 'teste@test.com', 
        dataNascimento: '1990-01-01', 
        sexo: 'M' 
    });
    componente.ngOnInit();
    expect(componente.formularioEditar).toBeTruthy();
    expect(componente.formulario.value.nome).toEqual('Teste');
    expect(componente.formulario.value.email).toEqual('teste@test.com');
    expect(componente.formulario.value.dataNascimento).toEqual('1990-01-01');
    expect(componente.formulario.value.sexo).toEqual('M');
  });

  it('deve navegar para a tela de listagem após salvar os dados', () => {
    spyOn(alunosService, 'adicionarAluno');
    componente.aoClicaremSalvar();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('deve navegar para tela de listagem após clicar em cancelar', () => {
    componente.aoClicaremCancelar();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});