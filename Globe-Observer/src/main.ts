import { AppModule } from './app/app/app.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
