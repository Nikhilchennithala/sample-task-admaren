import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllDetailsComponent } from './views/all-details/all-details.component';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'show-details', component: AllDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
