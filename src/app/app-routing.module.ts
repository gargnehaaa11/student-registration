import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomErrorComponent } from './custom-error/custom-error.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  { path : 'student', component : StudentComponent },
  {path : '**', component : CustomErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
