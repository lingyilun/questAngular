import { Routes } from '@angular/router';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { CountComponent } from './count/count.component';
import { LoginComponent } from './login/login.component';
import { QuestionnaireComponent } from './questionnaire-list/questionnaire/questionnaire.component';
import { PreviewComponent } from './questionnaire-list/questionnaire/preview/preview.component';
import { QuestListComponent } from './admin/quest-list/quest-list.component';
import { TabsComponent } from './admin/tabs/tabs.component';
import { AddQuestComponent } from './admin/tabs/add-quest/add-quest.component';
import { AddQuestOptionComponent } from './admin/tabs/add-quest-option/add-quest-option.component';
import { FeedbookComponent } from './admin/tabs/feedbook/feedbook.component';

export const routes: Routes = [
  { path: 'list', component: QuestionnaireListComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'count', component: CountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list-admin', component: QuestListComponent },
  { path: 'tabs-admin', component: TabsComponent,
    children:[
      { path: 'add', component: AddQuestComponent },
      { path: 'add-option', component: AddQuestOptionComponent },
      { path: 'count', component: CountComponent },
      { path: 'feedbook', component: FeedbookComponent },
    ]
   },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];
