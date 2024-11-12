import { Routes } from '@angular/router';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { AddListComponent } from './add-list/add-list.component';
import { CountComponent } from './count/count.component';
import { LoginComponent } from './login/login.component';
import { QuestionnaireComponent } from './questionnaire-list/questionnaire/questionnaire.component';
import { PreviewComponent } from './questionnaire-list/questionnaire/preview/preview.component';

export const routes: Routes = [
  { path: 'list', component: QuestionnaireListComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'count', component: CountComponent },
  { path: 'add', component: AddListComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];
