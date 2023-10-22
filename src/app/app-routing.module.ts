import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OlvideComponent } from './olvide/olvide.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"olvide", component:OlvideComponent},
  {path:"registrar", component:RegistrarComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
