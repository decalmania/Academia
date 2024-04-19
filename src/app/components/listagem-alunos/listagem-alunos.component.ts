import { Component, OnInit} from '@angular/core';
import { AlunosService } from '../../services/alunos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-alunos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-alunos.component.html',
  styleUrl: './listagem-alunos.component.css'
})
export class ListagemAlunosComponent implements OnInit{
  alunos: any;

  constructor(
    private alunosService: AlunosService,
    private roteador: Router) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.alunosService.obterAlunos().subscribe(
      (res) => {
        this.alunos = res;
      }
    )
  }

  aoClicarEmAdicionar() {
    const rotaFormularioAdicionar = 'adicionar-aluno';
    this.irParaTelaDeFormulario(rotaFormularioAdicionar);
  }

  aoClicarEmEditar(index: number) {
    const rotaFormularioEditar = 'editar-aluno';
    this.irParaTelaDeFormulario(rotaFormularioEditar, index);
  }

  aoClicarEmRemover(index: number) {
    const mensagemConfirmacaoRemover = "Tem certeza que deseja excluir os dados deste aluno?";
    if(confirm(mensagemConfirmacaoRemover)) {
      this.alunosService.deletarAluno(index)
      this.carregarAlunos();
    }
  }

  private irParaTelaDeFormulario(rota: string, index?: number) : void{
    index !== undefined 
    ? this.roteador.navigate([rota, index])
    : this.roteador.navigate([rota])
  }
}
