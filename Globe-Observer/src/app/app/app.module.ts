import { BrowserModule } from'@angular/platform-browser';
import { NgModule } from'@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ResultComponent } from '../result/result.component';
import { QuestionComponent } from '../question/question.component';
import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ResultComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
