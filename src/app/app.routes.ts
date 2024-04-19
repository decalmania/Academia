import { Routes } from '@angular/router';
import { ListagemAlunosComponent } from './components/listagem-alunos/listagem-alunos.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [
    {path: '', component: ListagemAlunosComponent},
    {path: 'adicionar-aluno', component: FormularioComponent},
    {path: 'editar-aluno/:id', component: FormularioComponent}
];
