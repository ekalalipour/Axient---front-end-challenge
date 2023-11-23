import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeafDataService {
  private leafName?: string 
  private leafImage?: string
  private userJourney: any[] = []; // Array to store the user's journey

  constructor() {}

  addUserJourneyStep(question: string, response: string) {
    this.userJourney.push({ question, userResponse: response });
  }

  setLeafData(name: string, image: string) {
    this.leafName = name;
    this.leafImage = image;
  }

  getLeafName(): string | undefined {
    return this.leafName;
  }

  getLeafImage(): string | undefined{
    return this.leafImage;
  }

  setUserJourney(journey: any[]) {
    this.userJourney = journey;
  }

  getUserJourney(): any[] {
    return this.userJourney;
  }
  
  resetUserJourney() {
    this.userJourney = []; // Resets the user journey array
  }
}


