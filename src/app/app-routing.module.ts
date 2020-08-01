import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/longin-component/login.component';
import { AuthGuard } from './login/auth-gaurd';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'feeds',
    loadChildren: './rss-parser/view-feeds.module#ViewFeedsModule',
    canActivate: [AuthGuard]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
