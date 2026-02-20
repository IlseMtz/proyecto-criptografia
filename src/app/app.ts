import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cifrador } from './cifrador/cifrador';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Cifrador],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-criptografia');
}
