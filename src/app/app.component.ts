import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ListagemAlunosComponent } from "./components/listagem-alunos/listagem-alunos.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule,
      FormsModule,
      RouterOutlet, 
      ListagemAlunosComponent,
      HttpClientModule
    ]
})
export class AppComponent {
  title = 'alunos-teste';
}
