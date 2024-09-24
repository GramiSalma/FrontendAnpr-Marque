import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnprComponent } from './anpr/anpr.component';
import { RechercheHistoriqueComponent } from './recherche-historique/recherche-historique.component'; // Importez le composant de recherche et d'historique
import { EditVoitureComponent } from './edit-voiture/edit-voiture.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {FaqComponent} from "./faq/faq.component"; // Importez le composant d'édition de voiture

import { DetectBrandComponent } from './detect-brand/detect-brand.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Route par défaut vers login
  { path: 'login', component: LoginComponent },

  { path: 'anpr', component: AnprComponent, canActivate: [AuthGuard] },
  { path: 'detect-brand', component: DetectBrandComponent, canActivate: [AuthGuard] },

  { path: 'faq', component: FaqComponent, canActivate: [AuthGuard] },
  { path: 'recherche-historique', component: RechercheHistoriqueComponent, canActivate: [AuthGuard] },
  { path: 'edit-voiture/:id', component: EditVoitureComponent, canActivate: [AuthGuard] },

  // Route pour les chemins non trouvés
  { path: '**', redirectTo: 'login' } // Redirection pour les chemins non trouvés vers login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
