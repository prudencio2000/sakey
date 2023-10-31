import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OlvideComponent } from './olvide/olvide.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path:"registrar", component:LoginComponent},
  {path:"olvide", component:OlvideComponent},
  {path:"", component:RegistrarComponent},
  {path:"principal", component:PrincipalComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
