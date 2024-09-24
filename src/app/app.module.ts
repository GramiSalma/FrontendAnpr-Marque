import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';  // Import MatSelectModule

import { AppComponent } from './app.component';
import { AnprComponent } from './anpr/anpr.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RechercheHistoriqueComponent } from './recherche-historique/recherche-historique.component';
import { AnprService } from "./anpr.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { EditVoitureComponent } from './edit-voiture/edit-voiture.component';
import { LoginComponent } from './login/login.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { FaqComponent } from './faq/faq.component'; // Assurez-vous d'importer votre composant ici
import { MatExpansionModule } from '@angular/material/expansion';
import { DetectBrandComponent } from './detect-brand/detect-brand.component';
import {NgOptimizedImage} from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    AnprComponent,
    NavbarComponent,
    RechercheHistoriqueComponent,
    EditVoitureComponent,
    LoginComponent,
    FaqComponent,
    DetectBrandComponent,
    // Ajoutez d'autres composants ici si nécessaire
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatMenuModule,
        MatSelectModule,  // Ajoutez MatSelectModule ici
        AppRoutingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ],
  providers: [AnprService, provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS,useClass:AppHttpInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
