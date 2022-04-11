import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { StartverificationComponent } from './startverification/startverification.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "buildings", component: BuildingsComponent},
  {path: "auth", component: AuthorizationComponent},
  {path: "verification", component: StartverificationComponent},
  {path: "dashboard", component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }