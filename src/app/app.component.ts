import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import {
  GridDataResult,
  DataBindingDirective,
} from '@progress/kendo-angular-grid';
import { map } from 'rxjs/operators';

interface PetOwner {
  name: string;
  pets: Pet[];
}

interface Pet {
  name?: string;
  classification?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  view: any;
  title = 'form-array-trials';
  formGroup: FormGroup;

  get petsFormArray(): FormArray {
    return !this.formGroup
      ? undefined
      : (this.formGroup.get('pets') as FormArray);
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      pets: this.formBuilder.array([]),
    });
    this.petsFormArray.valueChanges.subscribe((_) => {
      console.log('Form Array changed!');

      setTimeout(() => {
        this.view = this.petsFormArray.controls;
      }, 0);
    });

    this.formGroup.patchValue({
      name: 'Kevin',
    });

    let pets = [
      this.createPetEntry({ name: 'Inca', classification: 'Cat' }),
      this.createPetEntry({ name: 'Nova', classification: 'Evil Cat' }),
      this.createPetEntry({ name: 'Zorro', classification: 'Doggo' }),
    ];

    let formArray = this.formGroup.get('pets') as FormArray;

    pets.forEach(petFormGroup => formArray.push(petFormGroup));
  }

  createPetEntry(pet: Pet): FormGroup {
    return this.formBuilder.group({
      name: pet.name,
      classification: pet.classification,
    });
  }

  addNewEntry(): void {
    this.petsFormArray.push(this.createPetEntry({}));
  }

  removePet(index: number): void {
    const formArray = this.formGroup.get('pets') as FormArray;
    formArray.removeAt(index);
  }

  setValue(control: FormControl, $event: InputEvent) {
    const input = $event.currentTarget as HTMLInputElement;
    control.setValue(input.value);
  }
}
