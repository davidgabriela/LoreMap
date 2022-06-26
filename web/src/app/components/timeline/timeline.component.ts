import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TimelinesService } from 'src/app/services/timelines/timelines.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private location: Location,
    private timelineService: TimelinesService
  ) {}

  events$: Subject<any[]> = new Subject();
  events: any[] = [];

  ngOnInit() {
    const timelineId = this.location.path().split('/')[4];
    console.log('timeline id:: ', timelineId);
    this.timelineService.getEventsFromTimeline(timelineId).subscribe((data) => {
      this.setEvents(data);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '500px',
      data: {
        dialogTitle: 'Add an event to the timeline',
        dialogLabel: 'Enter event name',
        dialogSubmit: 'Add new event',
        textAreaLabel: `Write something about this event`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const timelineId = this.location.path().split('/')[4];
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);

      if (result) {
        let event = {
          title: result.name,
          information: result.text,
          color: `#${randomColor}`,
          timeline: timelineId,
        };
        console.log('created event!', event);

        this.timelineService.createEvent(event).subscribe((res) => {
          this.setEvents([...this.events, res]);
          console.log('Added event', res);
        });
      }
    });
  }

  setEvents(events: any[]) {
    this.events = events;
    this.events$.next(this.events);
  }

  deleteEvent(id: string) {
    this.timelineService.deleteEvent(id).subscribe((res) => {
      console.log('deleted event');
      this.events = this.events.filter((item) => item._id !== id);
      this.events$.next(this.events);
    });
  }
}
