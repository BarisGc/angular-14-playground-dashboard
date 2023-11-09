import { Component, Input, OnInit } from '@angular/core';
import { SomeserviceService } from '../../../services/someservice.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [SomeserviceService],
})
export class EmployeesComponent implements OnInit {
  @Input() childNo!: number;
  // todo: servisi kullanmayınca, parenttan viewchild ile yakalyabilir misin gene: evet
  constructor(private someserviceService: SomeserviceService) {}

  ngOnInit(): void {
    console.log('someServiceNo', this.someserviceService.someServiceNo);
  }
}
