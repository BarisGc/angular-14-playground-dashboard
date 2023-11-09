import { PublicParentService } from './../services/public-parent.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Child2Service } from '../services/child2.service';
import { ParentService } from '../services/parent.service';

@Component({
  selector: 'app-two-way-binding-and-input-output',
  templateUrl: './two-way-binding-and-input-output.component.html',
  styleUrls: ['./two-way-binding-and-input-output.component.scss'],
})
export class TwoWayBindingAndInputOutputComponent implements OnInit {
  currentItem = 'Television';

  items = ['item1', 'item2', 'item3', 'item4'];

  parentServiceData!:string
  child2ServiceData!:string
  constructor(
    private parentService: ParentService,
    public publicParentService:PublicParentService
  ) {}

  ngOnInit(): void {
    this.parentServiceData = this.parentService.parentServiceData
    this.child2ServiceData=this.parentService.child2Service.child2ServiceData = 'child2ServiceData'
  }

  addItem(newItem: string) {
    this.items.push(newItem);
  }
  deleteSearchedItem(newItem: string) {
    this.items = this.items.filter((item) => item !== newItem);
  }

  // ----------------------------------------------------------------
  fontSizePx = 16;
  // ----------------------------------------------------------------;
  doFromParentService() {
    this.parentService.do();
  }
}
