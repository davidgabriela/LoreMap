import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { Timeline } from 'src/app/models/Timeline';

@Injectable({
  providedIn: 'root',
})
export class TimelinesService {
  constructor(private http: HttpClient) {}

  getTimelinesFromLore(loreId: string): Observable<Timeline[]> {
    const timelinesUrl = `http://localhost:5000/api/v1/lore-collection/${loreId}/timelines/`;
    return this.http.get(timelinesUrl).pipe(map((data: any) => data.data));
  }

  getTimelineById(loreId: string, timelineId: string): Observable<Timeline> {
    const timelinesUrl = `http://localhost:5000/api/v1/lore-collection/${loreId}/timelines/${timelineId}`;
    return this.http.get(timelinesUrl).pipe(map((data: any) => data.data));
  }
  createTimeline(timeline: Timeline): Observable<Timeline[]> {
    const createUrl = 'http://localhost:5000/api/v1/timelines';
    return this.http
      .post(createUrl, timeline)
      .pipe(map((data: any) => data.data));
  }
  deleteTimeline(id: string) {
    const deleteUrl = `http://localhost:5000/api/v1/timelines/${id}`;
    return this.http.delete(deleteUrl);
  }
  updateTimeline(id: string, body: Object) {
    const updateUrl = `http://localhost:5000/api/v1/timelines/${id}`;
    return this.http.put(updateUrl, body);
  }

  // Requests for events
  getEventsFromTimeline(timelineId: string): Observable<Event[]> {
    const eventsUrl = `http://localhost:5000/api/v1/timelines/${timelineId}/events`;
    console.log('URL', eventsUrl);
    return this.http.get(eventsUrl).pipe(map((data: any) => data.data));
  }

  createEvent(event: Event): Observable<Event[]> {
    const createUrl = 'http://localhost:5000/api/v1/events';
    return this.http.post(createUrl, event).pipe(map((data: any) => data.data));
  }
  deleteEvent(id: string) {
    const deleteUrl = `http://localhost:5000/api/v1/events/${id}`;
    return this.http.delete(deleteUrl);
  }
  updateEvent(id: string, body: string) {
    const updateUrl = `http://localhost:5000/api/v1/events/${id}`;
    return this.http.put(updateUrl, body);
  }
}
