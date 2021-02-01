import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Prodotto } from '../models/prodotto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {

  private dbPath = '/prodotti';

  prodottiRef: AngularFireList<Prodotto>;

  constructor(private db: AngularFireDatabase) {
    this.prodottiRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Prodotto> {
    return this.prodottiRef;
  }

  create(prodotto: Prodotto): any {
    return this.prodottiRef.push(prodotto);
  }

  update(key: string, value: any): Promise<void> {
    return this.prodottiRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.prodottiRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.prodottiRef.remove();
  }
}
