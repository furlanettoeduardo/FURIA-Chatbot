import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html'
})
export class ChatbotComponent {
  prompt = '';
  response = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    this.http.post<any>('http://localhost:3000/chat', {
      prompt: this.prompt
    }).subscribe(res => {
      this.response = res.response;
    });
  }
}
