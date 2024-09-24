import { Component } from '@angular/core';
import { AnprService } from '../anpr.service';

@Component({
  selector: 'app-detect-brand',
  templateUrl: './detect-brand.component.html',
  styleUrls: ['./detect-brand.component.css']
})
export class DetectBrandComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';
  error: string | null = null;
  brandName: string | null = null;
  loading: boolean = false;

  constructor(private anprService: AnprService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.brandName = null; // Réinitialiser la marque détectée
      this.error = null; // Réinitialiser les erreurs
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null;
      this.imagePreview = '';
      this.brandName = null; // Réinitialiser si aucun fichier sélectionné
    }
  }

  onDetect(): void {
    if (this.selectedFile) {
      this.loading = true;
      this.anprService.detectBrand(this.selectedFile).subscribe(
        (response: any) => {
          this.brandName = response.brand; // Récupérer la marque détectée
          console.log('Marque détectée :', this.brandName);
          this.loading = false;
        },
        (error) => {
          this.error = 'Erreur lors de la détection de la marque.';
          this.loading = false;
        }
      );
    } else {
      this.error = 'Veuillez sélectionner un fichier avant de détecter la marque.';
    }
  }

  closeError(): void {
    this.error = null;
  }
}
