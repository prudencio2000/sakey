import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OlvideComponent } from './olvide/olvide.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { PrincipalComponent } from './principal/principal.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"olvide", component:OlvideComponent},
  {path:"registrar", component:RegistrarComponent},
  {path:"principal", component:PrincipalComponent},
  {path:"", component:RedirectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
