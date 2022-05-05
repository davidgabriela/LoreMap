import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { Lore } from './Lore';
import { LORES } from './mock-lores';

@Component({
  selector: 'app-lore-collection',
  templateUrl: './lore-collection.component.html',
  styleUrls: ['./lore-collection.component.scss'],
})
export class LoreCollectionComponent {
  loreCollection: Lore[] = LORES;
  name: string = '';
  loresCount: number = 17;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.name = result;
      if (result.length) this.addLore();
    });
  }

  addLore(): void {
    const newLore = { id: ++this.loresCount, title: this.name };
    console.log(newLore);
    this.loreCollection.push(newLore);
  }

  removeLore(lore: Lore): void {
    const index = this.loreCollection.indexOf(lore);
    if (index > -1) this.loreCollection.splice(index, 1);
  }
}
