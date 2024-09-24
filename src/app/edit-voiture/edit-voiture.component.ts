import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnprService, Voiture } from '../anpr.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-voiture',
  templateUrl: './edit-voiture.component.html',
  styleUrls: ['./edit-voiture.component.css']
})
export class EditVoitureComponent implements OnInit {
  voiture: Voiture | undefined;
  imageName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private anprService: AnprService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef // Ajout de ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getVoiture();
  }

  getVoiture(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.anprService.getVoitureById(id).subscribe((voiture: Voiture) => {
      this.voiture = voiture;
      if (this.voiture && this.voiture.image) {
        // Modifier le chemin de l'image
        this.voiture.image = this.voiture.image.replace('C:/Users/salma/OneDrive/Bureau/ang-proj/frontend-immatriculation/src', '');
        this.imageName = this.extractImageName(this.voiture.image);
      }
      this.cdr.detectChanges(); // Appel à detectChanges
    });
  }

  extractImageName(imagePath: string): string {
    // Enlever le chemin complet pour obtenir uniquement le nom du fichier
    return imagePath.replace('C:/Users/salma/OneDrive/Bureau/ang-proj/frontend-immatriculation/src/assets/images_voitures/', '/assets/images_voitures/');
  }

  updatePlateText(): void {
    if (this.voiture) {
      const replacementMap: { [key: string]: string } = {
        'a': 'أ',
        'b': 'ب',
        'w': 'و',
        'h': 'هـ',
        'd': 'د',
        'ch': 'ش'
      };

      let series = this.voiture.serie;

      if (series.includes('waw')) {
        series = series.replace('waw', 'و');
      } else {
        series = series.split('').map((letter: string) => replacementMap[letter] || letter).join('');
      }

      this.voiture.plaque = `${this.voiture.numOrdre} | ${series} | ${this.voiture.prefecture}`;
    }
  }

  save(): void {
    if (this.voiture) {
      this.updatePlateText(); // Mise à jour de la plaque avant d'enregistrer
      this.anprService.updateVoiture(this.voiture).subscribe(() => {
        this.snackBar.open('Voiture mise à jour avec succès', 'Fermer', { duration: 2000 });
        this.router.navigate(['/recherche-historique']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/recherche-historique']);
  }
}
