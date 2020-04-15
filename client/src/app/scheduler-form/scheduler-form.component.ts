import { Component, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SchedulerService } from '../services/scheduler.service';

@Component({
  selector: 'app-scheduler-form',
  templateUrl: './scheduler-form.component.html',
  styleUrls: ['./scheduler-form.component.scss']
})
export class SchedulerFormComponent implements OnChanges {
  submitDisabled: boolean = false;
  schedulerForm = this.fb.group({
    url: [null, Validators.required],
    payload: [null],
    retry: [2, Validators.required],
    method: ['GET', Validators.required],
    scheduledDate: [new Date(), Validators.required],
    email: [null, Validators.required]
  });

  methods = [
    'GET',
    'POST',
    'DELETE',
    'PUT'
  ]

  constructor(private fb: FormBuilder, private schedulerService: SchedulerService) { }
  ngOnChanges(): void {
    this.schedulerForm.valueChanges.subscribe(_ => {
      this.submitDisabled = !this.schedulerForm.valid
    })
  }
  onSubmit() {
    const formValues = { ...this.schedulerForm.value, payload: JSON.stringify(this.schedulerForm.value.payload) }

    this.schedulerService.scheduleRequest(formValues)
      .subscribe(data => {
        console.log(data);
        console.log(`Successfully created ${formValues}`)
      })
  }
}
