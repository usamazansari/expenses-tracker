import { Injectable } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { User } from 'firebase/auth';

import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirestorePocketbookRulesService {
  checkPocketbookAccess(pocketbook: IPocketbook<Timestamp>, { uid = '' }: User) {
    return pocketbook.owner === uid || pocketbook.collaboratorList.includes(uid);
  }
}
