import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnprService, Voiture } from '../anpr.service';

@Component({
  selector: 'app-recherche-historique',
  templateUrl: './recherche-historique.component.html',
  styleUrls: ['./recherche-historique.component.css']
})
export class RechercheHistoriqueComponent implements OnInit {
  displayedColumns: string[] = ['idVoiture', 'plaque', 'prefecture', 'numOrdre', 'serialNumber', 'status', 'actions'];
  dataSource: MatTableDataSource<Voiture> = new MatTableDataSource<Voiture>();
  filterColumn: string = '';
  showConfirmationDialog: boolean = false;  // Variable pour contrôler l'affichage de la boîte de dialogue
  idToDelete: number | null = null;  // ID de la voiture à supprimer

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private anprService: AnprService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.fetchVoitures();
  }

  fetchVoitures() {
    this.anprService.getVoitures().subscribe((data: Voiture[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Voiture, filter: string) => {
      const dataStr = this.filterColumn ? (data as any)[this.filterColumn]?.toString().toLowerCase() : '';
      return dataStr.indexOf(filter) !== -1;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editVoiture(voiture: Voiture) {
    if (voiture.idVoiture) {
      this.router.navigate(['/edit-voiture', voiture.idVoiture]);
    } else {
      console.error('ID de la voiture non défini');
    }
  }

  openDeleteConfirmation(id: number) {
    this.showConfirmationDialog = true;
    this.idToDelete = id;
  }

  confirmDelete() {
    if (this.idToDelete !== null) {
      this.anprService.deleteVoiture(this.idToDelete).subscribe(() => {
        this.fetchVoitures();
        this.snackBar.open('Deleted successfully', 'Close', { duration: 2000 });
        this.showConfirmationDialog = false; // Fermer la fenêtre de confirmation
      }, error => {
        this.snackBar.open('Failed to delete', 'Close', { duration: 2000 });
        this.showConfirmationDialog = false; // Fermer la fenêtre de confirmation même en cas d'erreur
      });
    }
  }

  cancelDelete() {
    this.showConfirmationDialog = false;
  }

  exportToCSV() {
    const csvRows = [];
    const headers = this.displayedColumns.join(',');
    csvRows.push(headers);

    this.dataSource.filteredData.forEach((element: Voiture) => {
      const row = this.displayedColumns.map(column => {
        const value = (element as any)[column];
        return value !== undefined ? value.toString().replace(/"/g, '""') : '';
      }).join(',');
      csvRows.push(row);
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob(["\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'voitures.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
