import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LeafDataService } from '../leaf-data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  currentQuestion: any;
  selectedOption: any;
  breadcrumb: any[] = []; // Stores the history of questions for navigation
  showNextIcon = false; // Controls visibility of next icon
  isNextButtonDisabled = true; // Controls state of the Next button
  userJourney: { question: string, userResponse: string }[] = []; // Records user's choices

  constructor(
    private http: HttpClient, 
    private router: Router,
    private leafDataService : LeafDataService
    ) {}

  ngOnInit() {
    // Fetch the initial question data from JSON
    this.http.get('/assets/tree-data.json').subscribe({
      next: (data) => {
        console.log("Loaded data:", data);
        this.currentQuestion = data;
        console.log("Current question options:", this.currentQuestion.options);
      },
      error: (error) => {
        console.log('Error loading questions:', error);
      },
      complete: () => {
        console.log('Data loading complete');
      }
    });
  }

  selectOption(optionValue: string) {
    // Set the selected option and record the user's journey
    this.selectedOption = this.currentQuestion.options.find(
      (option: { type: string }) => option.type === optionValue
    );
    this.userJourney.push({
      question: this.currentQuestion.question,
      userResponse: this.selectedOption.type
    });
    // Enable the Next button
    this.isNextButtonDisabled = false;
  }
  
  // Show and then hide the next icon
  handleNextIconDisplay() {
    this.showNextIcon = true;
    setTimeout(() => {
      this.showNextIcon = false;
    }, 500); 
  }

  handleNextButtonState() {
    // Delay in disabling the Next button after it's clicked
    setTimeout(() => {
      this.isNextButtonDisabled = true;
    }, 500); 
  }
  
  
  clickNext() {
    console.log('clickNext - Selected option:', this.selectedOption);
  
    if (this.selectedOption) {
      // Record the current question and response in the service
      this.leafDataService.addUserJourneyStep(this.currentQuestion.question, this.selectedOption.type);
  
      if (this.selectedOption.question) {
        // Handle navigating to the next question
        this.breadcrumb.push(this.currentQuestion);
        this.currentQuestion = this.selectedOption;
        console.log('Navigating to next question:', this.currentQuestion);
        this.handleNextIconDisplay();
        this.handleNextButtonState();
      } else {
        // Handle final leaf species identification
        console.log('Selected species:', this.selectedOption.species, 'Image path:', this.selectedOption.img);
        // Store the final identification in the service
        this.leafDataService.setLeafData(this.selectedOption.species, this.selectedOption.img);
        this.router.navigate(['/result']);
      }
      this.selectedOption = null;
    } else {
      console.log('No option selected.');
    }
  }
  
  
  goBack() {
     // Handles the back navigation in the question flow
    if (this.breadcrumb.length > 0) {
      this.currentQuestion = this.breadcrumb.pop();
      this.selectedOption = null;
      this.showNextIcon = false;
      
    }
  }
}
