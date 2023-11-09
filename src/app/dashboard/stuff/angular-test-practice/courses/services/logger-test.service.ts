import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerTestService {
  log(message: string) {
    console.log(message);
  }
}
