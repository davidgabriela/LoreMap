import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Timeline } from 'src/app/models/Timeline';
import { TimelinesService } from 'src/app/services/timelines/timelines.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-timeline-collection',
  templateUrl: './timeline-collection.component.html',
  styleUrls: ['./timeline-collection.component.scss'],
})
export class TimelineCollectionComponent implements OnInit {
  timelineCollection: Observable<Timeline[]> = new Observable();
  name: string = '';

  constructor(
    public dialog: MatDialog,
    private location: Location,
    private timelinesService: TimelinesService
  ) {}

  ngOnInit(): void {
    this.getTimelines();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {
        dialogTitle: 'Add a new timeline',
        dialogLabel: 'Enter name',
        dialogSubmit: 'Add timeline',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const loreId = this.location.path().split('/')[2];
        const timeline = { name: result.name, lore: loreId };
        this.addTimeline(timeline);
      }
    });
  }

  getTimelines(): void {
    const loreId = this.location.path().split('/')[2];
    this.timelineCollection =
      this.timelinesService.getTimelinesFromLore(loreId);
  }

  addTimeline(timeline: Timeline): void {
    this.timelinesService.createTimeline(timeline).subscribe((res) => {
      this.getTimelines();
    });
  }

  removeTimeline(id: string | undefined): void {
    if (id)
      this.timelinesService.deleteTimeline(id).subscribe((res) => {
        this.getTimelines();
      });
  }
}
