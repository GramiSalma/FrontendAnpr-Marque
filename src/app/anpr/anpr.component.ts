import { Component } from '@angular/core';
import { AnprService, Voiture } from '../anpr.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anpr',
  templateUrl: './anpr.component.html',
  styleUrls: ['./anpr.component.css']
})
export class AnprComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';
  filePath: string = '';
  result: any;
  loading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(private anprService: AnprService, private snackBar: MatSnackBar) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

      this.anprService.uploadFile(file).subscribe(
        (response: any) => {
          this.filePath = response.filePath;
        },
        error => {
          console.error('Error uploading file', error);
          this.error = 'Erreur lors du téléchargement du fichier. Veuillez réessayer.';
        }
      );
    } else {
      this.selectedFile = null;
      this.imagePreview = '';
    }
  }

  onDetect(): void {
    if (this.filePath) {
      this.loading = true;
      this.error = null;
      this.successMessage = null;
      this.anprService.detectPlate({ filePath: this.filePath }).subscribe(
        data => {
          this.result = data;
          this.updatePlateText();
          // Vérifier si l'ID de la voiture est présent et le stocker
          if (this.result.idVoiture) {
            console.log('ID de la voiture détectée:', this.result.idVoiture);
          } else {
            console.error('ID de la voiture non trouvé');
          }
          this.saveDetectionResult();
          this.resetAfterOperation();
        },
        error => {
          console.error('Error detecting plate', error);
          this.error = "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.";
          this.resetAfterOperation();
        }
      );
    } else {
      console.error('No file path provided');
    }
  }

  saveDetectionResult(): void {
    const detectionData = {
      filePath: this.filePath,
      plate: this.result.plate_text,
      detected: true,
      orderNumber: this.result.order_number,
      serialNumber: this.result.registration_series,
      prefecture: this.result.prefecture_number
    };

    this.anprService.saveDetectionResult(detectionData).subscribe(
      response => {
        console.log('Detection result saved successfully', response);
        this.snackBar.open('Voiture enregistrée avec succès', 'Fermer', { duration: 2000 });
      },
      error => {
        console.error('Error saving detection result', error);
        this.error = "Erreur lors de l'enregistrement des résultats de la détection. Veuillez réessayer.";
      }
    );
  }

  resetAfterOperation(): void {
    this.selectedFile = null;
    this.filePath = '';
    this.loading = false;
  }

  closeError(): void {
    this.error = null;
  }

  closeSuccess(): void {
    this.successMessage = null;
  }

  updatePlateText(): void {
    const replacementMap: { [key: string]: string } = {
      'a': 'أ',
      'b': 'ب',
      'w': 'و',
      'h': 'هـ',
      'd': 'د',
      'ch': 'ش'
    };

    let series = this.result.registration_series;

    if (series.includes('waw')) {
      series = series.replace('waw', 'و');
    } else {
      series = series.split('').map((letter: string) => replacementMap[letter] || letter).join('');
    }

    this.result.plate_text = `${this.result.order_number} | ${series} | ${this.result.prefecture_number}`;
  }

  onUpdate(): void {
    if (this.result && this.result.idVoiture) {  // Vérifier que 'idVoiture' est bien présent
      const updatedVoiture: Voiture = {
        idVoiture: this.result.idVoiture,
        plaque: this.result.plate_text,
        prefecture: this.result.prefecture_number,
        numOrdre: this.result.order_number,
        serie: this.result.registration_series,
        status: this.result.status || '',
        image: this.result.image || ''
      };

      this.anprService.updateVoiture(updatedVoiture).subscribe(
        response => {
          this.snackBar.open('Les informations de la voiture ont été mises à jour avec succès', 'Fermer', { duration: 2000 });
          this.successMessage = 'Voiture mise à jour avec succès';
        },
        error => {
          console.error('Error updating voiture', error);
          this.error = "Erreur lors de la mise à jour de la voiture. Veuillez réessayer.";
        }
      );
    } else {
      this.error = 'ID de la voiture introuvable. Veuillez d\'abord détecter la voiture.';
    }
  }
}
