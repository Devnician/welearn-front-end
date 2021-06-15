import { Component, OnInit } from '@angular/core';
import { DonkeyService } from 'src/app/core/donkey.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  eventDto;
  constructor(private donkey: DonkeyService) {
    if (donkey.isLoaded()) {
      this.eventDto = donkey.getData();
      console.log(this.eventDto);
       
    }
  }

  ngOnInit(): void {}
}
