import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })
export class SnackbarService  {
    constructor(private _snackBar: MatSnackBar) { }


    error(message: string) {
        return this._snackBar.open(message, undefined, { panelClass: ['snackbar-error'], duration: 3000  });
    }

    success(message: string) {
        return this._snackBar.open(message, undefined, { panelClass: ['snackbar-success'] , duration: 3000 });
    }

    productAdded(message: string) {
        return this._snackBar.open(message, undefined, { panelClass: ['snackbar-success'] , duration: 5000 });
    }

    info(message: string) {
        return this._snackBar.open(message, undefined, { panelClass: ['snackbar-info'] , duration: 3000 });
    }
}