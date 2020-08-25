import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';

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
  title = 'form-array-trials';
  formGroup: FormGroup;
  get petsFormArray(): AbstractControl[] {
    return !this.formGroup
      ? []
      : (this.formGroup.get('pets') as FormArray).controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['Kevin'],
      pets: this.formBuilder.array([
        this.createPetEntry({ name: 'Inca', classification: 'Cat' }),
        this.createPetEntry({ name: 'Nova', classification: 'Evil Cat' }),
        this.createPetEntry({ name: 'Zorro', classification: 'Doggo' }),
      ]),
    });
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
}
