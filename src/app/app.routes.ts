import { Routes } from '@angular/router';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { AddListComponent } from './add-list/add-list.component';

export const routes: Routes = [
  { path: 'list', component: QuestionnaireListComponent },
  { path: 'add', component: AddListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];
