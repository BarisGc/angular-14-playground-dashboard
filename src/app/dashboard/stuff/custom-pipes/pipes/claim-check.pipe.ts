import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { FakeAuthService } from '../services/fake-auth.service';

@Pipe({
  name: 'claimCheck',
})
export class ClaimCheckPipe implements PipeTransform {
  constructor(private fakeAuthService: FakeAuthService) {}
  transform(claim: string): boolean {
    return this.fakeAuthService.getFakeApiResponse().hasClaim(claim);
  }
}
