import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../../services/alunos.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  alunoIndex!: number;
  formulario!: FormGroup;
  formularioEditar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alunosService: AlunosService, 
    private rota: ActivatedRoute,
    private roteador: Router
  ) {}

  ngOnInit(): void {
    const parametroId = 'id';
    this.inicializarFormulario();

    this.rota.params.subscribe(params => {
      const index = params[parametroId];
      if(index!==undefined && index >= 0) {
        this.alunoIndex = index;
        const alunoPeloIndex = this.alunosService.obterAlunoPorIndex(this.alunoIndex);
        if(alunoPeloIndex) {
          this.formularioEditar = true;
          this.preencherFormulario(alunoPeloIndex);
        }
      }
    })
  }

  inicializarFormulario(): void {
    const propriedadeVazia = '';
    this.formulario = this.fb.group ({
      nome: [propriedadeVazia, Validators.required],
      email: [propriedadeVazia, Validators.required],
      dataNascimento: [propriedadeVazia, Validators.required],
      sexo: [propriedadeVazia, Validators.required]
    })
  }

  preencherFormulario(aluno: any): void {
    this.formulario.patchValue ({
      nome: aluno.Nome,
      email: aluno.Email,
      dataNascimento: this.formatarData(aluno.DataNascimento),
      sexo: aluno.Sexo
    })
  }

  obterDadosDoFormulario(): any {
    const alunoDoFormulario: any = {
      Nome: this.formulario.value.nome,
      Email: this.formulario.value.email,
      DataNascimento: this.formatarData(this.formulario.value.dataNascimento),
      Sexo: this.formulario.value.sexo
    }
    return alunoDoFormulario;
  }

  aoClicaremSalvar(): void {
    const alunoDoFormulario = this.obterDadosDoFormulario();

    this.formularioEditar
    ? this.alunosService.atualizarAluno(this.alunoIndex, alunoDoFormulario)
    : this.alunosService.adicionarAluno(alunoDoFormulario);

    this.irParaTelaDeListagem();
  }

  aoClicaremCancelar() {
    this.irParaTelaDeListagem();
  }

  private formatarData(data: string): string {
    const separadorData = '-';
    const [dia, mes, ano] = data.split(separadorData);
    return `${ano}-${mes}-${dia}`; 
  }

  private irParaTelaDeListagem(): void {
    const rotaTelaListagem = '';
    this.roteador.navigate([rotaTelaListagem]);
  }
}
