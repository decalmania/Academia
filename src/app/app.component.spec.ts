import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let componente = fixture.componentInstance;

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [
            AppComponent
        ],
        }).compileComponents();
    });

    it('deve criar o componente', () => {
        expect(componente).toBeTruthy();
    });

    it('deve ter o título "alunos-teste"', () => {
        expect(componente.title).toEqual('alunos-teste');
    });

    it('deve renderizar o router-outlet', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('router-outlet')).toBeTruthy();
    });
});