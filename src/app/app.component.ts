/*This is the root component of your app. It will act just like the MainView in your myFlix project,
loading data and displaying one subview or another, depending on its state.
This component has the same structure as the QuestionForm component, except it doesn't use ngOnInit
because it doesn't have inputs. You use the constructor to load data using the QuestionsService you defined earlier.
Notice how the same dependency injection pattern has been used—explicitly asking for a parameter of a certain type in
the constructor's signature. Once the data has been received, you initialize some properties on the instance.
These will be used in the template, along with the two other methods (updateChoice will be called each time the user
selects an answer, and nextOrViewResults will be called each time the user clicks on the “Next” button).*/

import { Component } from '@angular/core';
import { QuestionsService } from './questions.service';
import { Quiz, Answers, Choice } from './quiz.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  answers: Answers;
  quiz: Quiz;
  currentQuestionIndex: number;
  private showResults = false;

  constructor(private questionsService: QuestionsService) {
    this.questionsService.getJSON('maths').subscribe((data) => {
      this.quiz = new Quiz('maths', data);
      this.answers = new Answers();
      this.currentQuestionIndex = 0;
    });
  }

  updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.quiz.questions.length - 1) {
      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
  }
}
