import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  prompt = '';
  response = '';
  messages: { text: string, isUser: boolean }[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.prompt.trim()) {
      // Adiciona a mensagem do usuário
      this.messages.push({ text: this.prompt, isUser: true });

      // Envia a mensagem para o servidor
      this.http.post<any>('http://localhost:3000/chat', {
        prompt: this.prompt
      }).subscribe(res => {
        // Adiciona a resposta do bot
        this.response = res.response;
        this.messages.push({ text: this.response, isUser: false });
        this.scrollToBottom();  // Rola para a última mensagem
        this.prompt = '';  // Limpa o campo de entrada
      });
    }
  }

  // Método para rolar até a última mensagem
  scrollToBottom() {
    setTimeout(() => {
      const chatBox = document.querySelector('.chat-box');
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }, 100);
  }
}
