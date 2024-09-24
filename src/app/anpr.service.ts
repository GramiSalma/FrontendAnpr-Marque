import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// Définition de l'interface Voiture
export interface Voiture {
  idVoiture: number;
  plaque: string;
  prefecture: string;
  numOrdre: string;
  serie: string;
  status: string;
  image: string;
  // Ajoutez d'autres champs selon la définition de votre entité Voiture
}

@Injectable({
  providedIn: 'root'
})
export class AnprService {
  private apiUrl = 'http://localhost:8080'; // URL de votre backend Spring Boot

  constructor(private http: HttpClient,private router: Router) {}

  // Méthode pour détecter les plaques d'immatriculation
  detectPlate(filePath: { filePath: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/detect`, filePath);
  }
  editVoiture(voiture: Voiture) {
    console.log('Édition de la voiture:', voiture.image);
    this.router.navigate(['/edit-voiture', voiture.idVoiture]); // Rediriger vers le composant d'édition avec l'ID de la voiture
  }

  // Méthode pour télécharger un fichier
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  // Méthode pour sauvegarder les résultats de détection
  saveDetectionResult(detectionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-detection`, detectionData);
  }

  // Méthode pour obtenir toutes les voitures
  getVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(`${this.apiUrl}/voitures/all`);
  }

  // Méthode pour supprimer une voiture
  deleteVoiture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/voitures/delete/${id}`);
  }

  // Méthode pour ajouter une nouvelle voiture
  addVoiture(voiture: Voiture): Observable<Voiture> {
    return this.http.post<Voiture>(`${this.apiUrl}/voitures`, voiture);
  }
  getVoitureById(id: number): Observable<Voiture> {
    return this.http.get<Voiture>(`${this.apiUrl}/voitures/findOne/${id}`);
  }

  // Méthode pour mettre à jour une voiture existante
  updateVoiture(voiture: Voiture): Observable<Voiture> {
    return this.http.put<Voiture>(`${this.apiUrl}/voitures/update/${voiture.idVoiture}`, voiture);
  }
  detectBrand(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/brand/detect`, formData);
  }
}
