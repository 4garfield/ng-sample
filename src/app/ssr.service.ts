import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { USER_AGENT } from './useragent';

const SSR_STATE_KEY = makeStateKey<any>('sample-ssr-state');

declare var global: any;

@Injectable({
  providedIn: 'root',
})
export class SsrService {
  state: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferState: TransferState,
    @Optional() @Inject(USER_AGENT) private _userAgent: string
  ) {
    if (this.isPlatformBrowser()) {
      this.state = this.transferState.get(SSR_STATE_KEY, {});
    } else {
      this.state = {
        ua: this._userAgent || '',
      };
    }

    console.log(this.state);
  }

  isPlatformServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  serialize(state: any): void {
    this.transferState.set(SSR_STATE_KEY, Object.assign({}, this.state, state));
  }
}
