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
  breadcrumb: any[] = [];
  showNextIcon = false;
  isNextButtonDisabled = true;
  userJourney: { question: string, userResponse: string }[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router,
    private leafDataService : LeafDataService
    ) {}

  ngOnInit() {
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
    this.selectedOption = this.currentQuestion.options.find(
      (option: { type: string }) => option.type === optionValue
    );
    // Record the question and user response
    this.userJourney.push({
      question: this.currentQuestion.question,
      userResponse: this.selectedOption.type
    });
    // Enable the Next button
    this.isNextButtonDisabled = false;
  }
  
  
  handleNextIconDisplay() {
    this.showNextIcon = true;
    setTimeout(() => {
      this.showNextIcon = false;
    }, 500); // Hide the icon after 1 second
  }

  handleNextButtonState() {
    // Delay in disabling the Next button after it's clicked
    setTimeout(() => {
      this.isNextButtonDisabled = true;
    }, 500); // Delay of 0.5 seconds
  }
  
  
  // clickNext() {
  //   console.log('clickNext - Selected option:', this.selectedOption);
  
  //   if (this.selectedOption) {
  //     if (this.selectedOption.question) {
  //       // Handle navigating to the next question
  //       this.breadcrumb.push(this.currentQuestion);
  //       this.currentQuestion = this.selectedOption;
  //       console.log('Navigating to next question:', this.currentQuestion);
  //       this.handleNextIconDisplay();
  //     } else {
  //       // Handle selected leaf species
  //       console.log('Selected species:', this.selectedOption.species, 'Image path:', this.selectedOption.img);
  //       // Store the leaf data in the service and navigate to the result component
  //       this.leafDataService.setLeafData(this.selectedOption.species, this.selectedOption.img);
  //       this.router.navigate(['/result']);
  //     }
  //     this.handleNextButtonState();
  //     this.selectedOption = null;
  //   }
  // }

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
        // Final identification: handle the case when a leaf species is identified
        console.log('Selected species:', this.selectedOption.species, 'Image path:', this.selectedOption.img);
        // Store the final identification in the service
        this.leafDataService.setLeafData(this.selectedOption.species, this.selectedOption.img);
        this.router.navigate(['/result']);
      }
      this.selectedOption = null;
    } else {
      console.log('No option selected.');
      // Handle lack of selection (e.g., show an alert to the user)
    }
  }
  
  
  goBack() {
    if (this.breadcrumb.length > 0) {
      this.currentQuestion = this.breadcrumb.pop();
      this.selectedOption = null;
      this.showNextIcon = false;
      
    }
  }
}
