import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoreCollectionService } from 'src/app/services/lore-collection/lore-collection.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { Lore } from './Lore';

@Component({
  selector: 'app-lore-collection',
  templateUrl: './lore-collection.component.html',
  styleUrls: ['./lore-collection.component.scss'],
})
export class LoreCollectionComponent {
  loreCollection: Observable<Lore[]> = new Observable();
  name: string = '';
  loresCount: number = 17;

  constructor(
    public dialog: MatDialog,
    private loreCollectionService: LoreCollectionService
  ) {}

  ngOnInit(): void {
    this.getLores();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const lore = {
          title: result,
        };
        this.addLore(lore);
      }
    });
  }

  getLores(): void {
    this.loreCollection = this.loreCollectionService.getLores();
  }

  addLore(lore: Lore): void {
    this.loreCollectionService.addLore(lore).subscribe((response) => {
      this.getLores();
    });
  }

  removeLore(id: string | undefined): void {
    if (id)
      this.loreCollectionService.removeLore(id).subscribe((lore) => {
        this.getLores();
      });
  }
}
