import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppFeedsComponent } from './app-feeds/app-feeds.component';
import { ViewFeedsComponent } from './view-feeds/view-feeds.component';

const routes: Routes = [
  { path: 'view', component: ViewFeedsComponent },
  { path: 'add', component: AppFeedsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewFeedsRoutingModule {}
