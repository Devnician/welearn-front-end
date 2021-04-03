import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();


  let disFunc = () => 'console has been disabled in production mode';

  console.log = disFunc
  console.error = disFunc
  console.warn = disFunc

  Object.freeze(console);

}

platformBrowserDynamic().bootstrapModule(AppModule);
// platformBrowserDynamic().bootstrapModule(AppModule).then((moduleref) => { AppInjector.setInjector(moduleref.injector) })
//   .catch(err => console.error('Main.ts::::' + err));


// platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
//   // Ensure Angular destroys itself on hot reloads.
//   if (window['ngRef']) {
//     window['ngRef'].destroy();
//   }
//   window['ngRef'] = ref;

//   // Otherwise, log the boot error
// }).catch(err => console.error(err));