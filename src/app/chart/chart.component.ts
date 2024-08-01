import { Component } from '@angular/core';
import { EventData } from '../model/data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  events: EventData[] = [];
  days: EventData[] = [];
  months: string[] = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  daysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor() { }

  ngOnInit(): void {
    this.generateHeatmapData();
    this.fillDaysArray();
  }

  generateHeatmapData(): void {
    const startDate = new Date('2024-01-01');
    for (let i = 0; i < 365; i++) {
      const eventDate = new Date(startDate);
      eventDate.setDate(startDate.getDate() + i);
      this.events.push({ timestamp: eventDate, intensity: Math.floor(Math.random() * 10) });
    }
  }


  fillDaysArray(): void {
    const startDate = new Date('2024-01-01');
    for (let i = 0; i < 365; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      this.days.push({ timestamp: day, intensity: 0 });
    }

    for (const event of this.events) {
      const dayIndex = this.days.findIndex(day => day.timestamp.toDateString() === event.timestamp.toDateString());
      if (dayIndex !== -1) {
        this.days[dayIndex].intensity = event.intensity;
      }
    }
  }

  getColor(intensity: number): string {
    if (intensity > 7) {
      return '#32d950';
    } else if (intensity > 4) {
      return '#23a830';
    } else if (intensity > 2) {
      return '#016f35';
    } else if (intensity > 0) {
      return '#10442c';
    } else {
      return '#12161a';
    }
  }

  getFilledCellCount(): number {
    return this.days.filter(day => day.intensity > 0).length;
  }

}
