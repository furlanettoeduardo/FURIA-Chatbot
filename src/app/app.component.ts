import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prompt = '';
  response = '';

  // Modificar a declaração de messageInput para usar a asserção !
  @ViewChild('messageInput') messageInput!: ElementRef;

  constructor(private http: HttpClient) {}

  sendMessage() {
    const apiUrl = 'https://abc123.ngrok.io/chat'; // Substitua com o URL do seu ngrok
    this.http.post<any>(apiUrl, { prompt: this.prompt }).subscribe(res => {
      this.response = res.response;

      // Limpar a caixa de entrada de texto
      this.prompt = '';

      // Focar o campo de entrada de texto novamente
      this.messageInput.nativeElement.focus();
    });
  }
}
