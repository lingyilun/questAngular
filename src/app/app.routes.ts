import { Routes } from '@angular/router';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { AddListComponent } from './add-list/add-list.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { PreviewComponent } from './preview/preview.component';

export const routes: Routes = [
  { path: 'list', component: QuestionnaireListComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'add', component: AddListComponent },
  { path: '', redirectTo: '/questionnaire', pathMatch: 'full' },
];
