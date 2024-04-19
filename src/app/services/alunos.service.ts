import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Aluno } from '../models/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private localStorageKey = 'alunos';
  private httpUrl = 'https://6467a872e99f0ba0a814b5ff.mockapi.io/api/Pessoas';

  constructor(private http: HttpClient) {}

  obterAlunosDaAPI(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.httpUrl);
  }

  private alunosNoLocalStorage(aluno: Aluno[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(aluno));
  }

  private alunosDoLocalStorage(): Aluno[] {
    const alunosLocalStorage = localStorage.getItem(this.localStorageKey);
    return alunosLocalStorage ? JSON.parse(alunosLocalStorage) : [];
  }

  obterAlunos(): Observable<Aluno[]> {
    const alunosLocalStorage = this.alunosDoLocalStorage();
    if (alunosLocalStorage.length > 0) {
      return of(alunosLocalStorage);
    } else {
      return this.obterAlunosDaAPI().pipe(
        tap(res => this.alunosNoLocalStorage(res))
      );
    }
  }

  obterAlunoPorIndex(index: number): Aluno | null {
    const alunos = this.alunosDoLocalStorage();
    if(index >= 0 && index < alunos.length)
      return alunos[index]
    return null;
  }

  adicionarAluno(aluno: Aluno): void {
    const alunosLocalStorage = this.alunosDoLocalStorage();
    alunosLocalStorage.push(aluno);
    this.alunosNoLocalStorage(alunosLocalStorage);
  }

  atualizarAluno(index: number, aluno: Aluno): void {
    const alunosLocalStorage = this.alunosDoLocalStorage();
    if (index >= 0 && index < alunosLocalStorage.length) {
      alunosLocalStorage[index] = aluno;
      this.alunosNoLocalStorage(alunosLocalStorage);
    }
  }

  deletarAluno(index: number): void {
    const alunosLocalStorage = this.alunosDoLocalStorage();
    if (index >= 0 && index < alunosLocalStorage.length) {
      alunosLocalStorage.splice(index, 1);
      this.alunosNoLocalStorage(alunosLocalStorage);
    }
  }
}
