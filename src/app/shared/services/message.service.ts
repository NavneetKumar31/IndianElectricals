import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { FlashMessage } from '../models/flashMessage';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    msgObservable = new Subject<FlashMessage>();

    constructor() { }

    changeMessage(msg: FlashMessage) {
        this.msgObservable.next(msg);
    }
}
