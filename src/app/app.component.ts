import { AfterViewInit, Component } from '@angular/core';
import { SsrService } from './ssr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ng-sample';

  constructor(private ssrService: SsrService) {}

  ngAfterViewInit(): void {
    if (this.ssrService.isPlatformServer()) {
      this.ssrService.serialize({
        isBot: false,
      });
    }
  }
}
