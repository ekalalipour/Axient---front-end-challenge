import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafDataService } from '../leaf-data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'] 
})
export class ResultComponent implements OnInit {
  leafImage: string | undefined; // Filename of the identified leaf image
  leafName: string | undefined; // Name of the identified leaf
  userJourney: any[] = []; // Stores the user's journey through the question process
  leafTextures: string[] = ['Smooth', 'Rough', 'Hairy', 'Other']; // Options for leaf texture
  selectedTextures: string[] = []; // Stores user-selected textures
  leafColor: string = ''; // Stores user-selected leaf color
  additionalFeatures: Record<string, boolean> = {}; // Tracks additional features selected by the user

  constructor(private router: Router, private leafDataService: LeafDataService) {}

  ngOnInit() {
    // Retrieve leaf name, image, and user journey from the service
    this.leafName = this.leafDataService.getLeafName();
    this.leafImage = this.leafDataService.getLeafImage();
    this.userJourney = this.leafDataService.getUserJourney();
  }

  restart() {
    // Restart the identification process and navigate to the start page
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
