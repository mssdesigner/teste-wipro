import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  private static emitters: {
    [clickedChart: string]: EventEmitter<any>
  } = {}

  static get(clickedChart: string): EventEmitter<any> {
    if (!this.emitters[clickedChart])
      this.emitters[clickedChart] = new EventEmitter<any>();
    return this.emitters[clickedChart];
  }
}
