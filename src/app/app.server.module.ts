import { Inject, NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { USER_AGENT } from './useragent';

const useragentFactory = (req: any) => {
  return req.headers['user-agent'];
};

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    FlexLayoutServerModule,
  ],
  providers: [
    {
      provide: USER_AGENT,
      useFactory: useragentFactory,
      deps: [[new Inject(REQUEST)]],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
