import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './components/animal/animal.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';
import { AreaComponent } from './components/area/area.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EspacioComponent } from './components/espacio/espacio.component';


const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'inicio',component: InicioComponent},
  {path: 'area',component: AreaComponent},
  {path: 'animal',component: AnimalComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'login',component: LoginComponent},
  {path: 'logout',component: AppComponent},
  {path: 'espacio', component: EspacioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
