import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafDataService } from '../leaf-data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class ResultComponent implements OnInit {
  leafImage: string | undefined; // The filename of the leaf image
  leafName: string | undefined;
  userJourney: any[] = [];
  leafTextures: string[] = ['Smooth', 'Rough', 'Hairy', 'Other'];
  selectedTextures: string[] = [];
  leafColor: string = '';
  additionalFeatures: Record<string, boolean> = {};

  constructor(private router: Router, private leafDataService: LeafDataService) {}

  ngOnInit() {
    this.leafName = this.leafDataService.getLeafName();
    this.leafImage = this.leafDataService.getLeafImage();
    this.userJourney = this.leafDataService.getUserJourney();
    console.log('Result Page - User Journey:', this.userJourney);
  }

  restart() {
    // Logic to restart the identification process
    console.log('Restarting identification process...');
    this.leafDataService.resetUserJourney(); // Reset the user journey
    this.router.navigate(['/']);
  }

  onTextureChange(texture: string, event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  this.additionalFeatures[texture] = isChecked;
  console.log(`Texture: ${texture}, Checked: ${isChecked}`);
}

  submit() {
    // Retrieve the leaf name and image path from the LeafDataService
    const leafName = this.leafDataService.getLeafName();
    const leafImage = this.leafDataService.getLeafImage();

    // Prepare the final submission JSON
    const finalSubmission = {
      leafIdentificationProcess: this.leafDataService.getUserJourney(),
      finalIdentification: {
        species: leafName,
        imagePath: leafImage
      },
      additionalFeatures: this.additionalFeatures,
      leafColor: this.leafColor
    };

    console.log('Final Submission:', finalSubmission);
  }

}
