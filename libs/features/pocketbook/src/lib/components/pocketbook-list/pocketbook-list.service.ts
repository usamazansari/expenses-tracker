import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

export type PocketbookViewMode = 'owner' | 'collaborator';

@Injectable({
  providedIn: 'root'
})
export class PocketbookListService {
  #viewMode$ = new BehaviorSubject<PocketbookViewMode>('owner');
  #viewMode: PocketbookViewMode = 'owner';

  constructor(private _router: Router) {}

  fetchViewMode() {
    this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const { url, urlAfterRedirects } = e as NavigationEnd;
      this.setViewMode((urlAfterRedirects ?? url)?.split('/').at(-1) as PocketbookViewMode);
    });
  }

  setViewMode(viewMode: PocketbookViewMode = 'owner') {
    this.#viewMode = viewMode;
    this.#viewMode$.next(this.#viewMode);
  }

  watchViewMode$() {
    return this.#viewMode$.asObservable();
  }

  gotoAddPocketbook() {
    this._router.navigate(['pocketbook', 'add']);
  }

  gotoOwnerPocketbookList() {
    this.setViewMode('owner');
    this._router.navigate(['pocketbook', 'list', 'owner']);
  }

  gotoCollaboratorPocketbookList() {
    this.setViewMode('collaborator');
    this._router.navigate(['pocketbook', 'list', 'collaborator']);
  }
}
