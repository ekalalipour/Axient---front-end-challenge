import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  // Constructor to inject the Router service
  constructor(private router: Router) {}

  // Method to navigate to the question component when 'Get Started' is clicked
  getStarted() {
    // Navigate to the first question in the questionnaire
    this.router.navigate(['/question', 1]); 
  }
}
