import { AfterViewInit, Component, Inject, Optional } from '@angular/core';
import { USER_AGENT } from './useragent';
import { SsrService } from './ssr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'ng-sample';

  constructor(
    private ssrService: SsrService,
    @Optional() @Inject(USER_AGENT) private _userAgent: string
  ) {
    let userAgent = '';
    if (this._userAgent) {
      userAgent = this._userAgent;
    }
    console.log('userAgent', userAgent);
  }

  ngAfterViewInit(): void {
    if (this.ssrService.isPlatformServer()) {
      this.ssrService.serialize({
        isBot: false,
      });
    }
  }
}
