import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusTableComponent } from './status-table/status-table.component';
import { SchedulerFormComponent } from './scheduler-form/scheduler-form.component';


const routes: Routes = [
  { path: "", redirectTo: "status", pathMatch: "full" },
  { path: "status", component: StatusTableComponent },
  { path: "schedule", component: SchedulerFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
