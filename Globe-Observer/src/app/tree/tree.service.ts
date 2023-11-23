import { Injectable } from '@angular/core';
import treeData from '../../assets/tree-data.json';
import { TreeQuestion, TreeOption } from './tree-question.model';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private questions: TreeQuestion = treeData;
  private currentQuestionIndex: number = 0;
  private currentQuestion: TreeQuestion | null = this.questions;

  getCurrentQuestion(): TreeQuestion | null {
    return this.currentQuestion;
  }

   nextQuestions(): void {

   }

   previousQuestion(): void {

   }
};
