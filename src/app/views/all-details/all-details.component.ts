import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.component.html',
  styleUrls: ['./all-details.component.css']
})
export class AllDetailsComponent implements OnInit {
  details: any;

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.getData();
  }
  getData(): void {
    this.dataService.data.subscribe(response => {
      this.details = response[0];
      console.log('ress', response);
    });
  }

}
