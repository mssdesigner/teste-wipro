import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/event-emitter/event-emitter.service';
import { ServicesService } from 'src/app/services.service';
import { State } from './table.component.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  states: State[] = new Array;
  statesOriginal: State[] = new Array;
  title: string = 'Estados Brasileiros';
  header: string[] = ["#", "Estado", "Capital", "Sigla", "População"]

  constructor(private service: ServicesService) {
    EventEmitterService.get('clickedChart').subscribe((data: any) => this.reloadTable(data));
  }

  ngOnInit(): void {
    this.getStates();
  }

  getStates() {
    this.service.getStates().subscribe((data: State[]) => {
      let res = data;
      this.statesOriginal = res;
      this.states = res
    });
  }

  async reloadTable(region: any) {
    if (region != null) {
      const filter = _.filter(this.statesOriginal, { region });
      this.states = filter;
    } else {
      this.states = this.statesOriginal;
    }
    this.setTitle(region);
  }

  setTitle(title: any) {
    this.title = 'Estados Brasileiros';
    let text = title == null ? '' : `Região ${title}`;
    this.title = `${this.title} ${text}`
  }

  ngOnDestroy() {
    EventEmitterService.get('clickedChart').unsubscribe();
  }

}
