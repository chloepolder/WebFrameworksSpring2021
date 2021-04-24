import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';
import { CreateComponent } from './views/create/create.component';
import { DeleteComponent } from './views/delete/delete.component';
import { EditComponent } from './views/edit/edit.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent

  },
  {
    path:'create',
    canActivate: [AuthguardService],
    component:CreateComponent
  },
  {
    path:'edit/:id',
    canActivate: [AuthguardService],
    component:EditComponent
  },
  {
    path:'delete/:id',
    canActivate: [AuthguardService],
    component:DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
