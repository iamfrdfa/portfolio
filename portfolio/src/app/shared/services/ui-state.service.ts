import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiStateService {
    /** Wird auf true gesetzt, wenn ein Klick aus dem Mobile-Menü kam. */
    public delayNextScroll = false;

    triggerDelayedScrollOnce() {
        this.delayNextScroll = true;
    }

    consumeDelayedScroll(): boolean {
        const v = this.delayNextScroll;
        this.delayNextScroll = false;
        return v;
    }
}
