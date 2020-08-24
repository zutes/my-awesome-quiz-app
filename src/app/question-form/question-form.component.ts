//First, you make the usual imports—from Angular, from related classes, and, of course, your model for this component: the Question from the quiz file
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Question } from '../quiz.model';

/*Next, you use the @Component decorator to tell Angular that the class right below is a component.
The decorator contains instructions to wire up the class with its stylesheet and its template file*/
@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
/*You then use decorators again to define the component's input and output. Note how the output is an EventEmitter that accepts a generic type,
just like the observable you saw earlier. The generic type allows you to express what data the EventEmitter is going to carry. Think of these
two—input and output—like a React component’s props.*/
export class QuestionFormComponent implements OnInit {
  @Input() question: Question;
  @Output() onChoiceMade = new EventEmitter<string>();

  private form: FormGroup;

  /*The ngOnInit method is called once the component has received all its inputs (actually, all its data-bound properties) from the
  calling component (the outside world, as far as this component is concerned). Here, you initialize a form controller, the programmatic entity
  that will link the model and the view*/
  ngOnInit() {
    this.form = new FormGroup({
      choice: new FormControl(),
    });

    this.form.valueChanges.subscribe(this.onChange);
  }

  /*This is also where you wire up the form controller with the other method in this component—onChange—in which you dispatch the
  choice that's been made by the user.*/
  onChange = () => {
    this.onChoiceMade.emit(this.form.value.choice);
  };
}
