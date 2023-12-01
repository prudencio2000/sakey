import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarComponent } from './registrar/registrar.component';
import { OlvideComponent } from './olvide/olvide.component';
import { PrincipalComponent } from './principal/principal.component';
import { TablaComponent } from './tabla/tabla.component';
import { EditorComponent } from './editor/editor.component';
import { ViewComponent } from './view/view.component';
import { SelectorComponent } from './items/selector/selector.component';
import { RedirectComponent } from './redirect/redirect.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    OlvideComponent,
    PrincipalComponent,
    TablaComponent,
    EditorComponent,
    ViewComponent,
    SelectorComponent,
    RedirectComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
