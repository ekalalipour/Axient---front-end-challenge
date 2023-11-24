import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This service is provided in the root of the application
})
export class LeafDataService {
  private leafName?: string; // Stores the name of the identified leaf
  private leafImage?: string; // Stores the image path of the identified leaf
  private userJourney: any[] = []; // Array to store the user's journey through the questions

  constructor() {}

  // Adds a step to the user's journey, recording each question and response
  addUserJourneyStep(question: string, response: string) {
    this.userJourney.push({ question, userResponse: response });
  }

  // Sets the final leaf data (name and image) after identification
  setLeafData(name: string, image: string) {
    this.leafName = name;
    this.leafImage = image;
  }

  // Retrieves the name of the identified leaf
  getLeafName(): string | undefined {
    return this.leafName;
  }

  // Retrieves the image path of the identified leaf
  getLeafImage(): string | undefined {
    return this.leafImage;
  }

  // Sets the user's journey (mainly for testing or predefined paths)
  setUserJourney(journey: any[]) {
    this.userJourney = journey;
  }

  // Retrieves the user's journey through the questions
  getUserJourney(): any[] {
    return this.userJourney;
  }
  
  // Resets the user journey array, used when restarting the process
  resetUserJourney() {
    this.userJourney = [];
  }
}



