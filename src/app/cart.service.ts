import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Prodotto } from './models/prodotto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private dbPath = '/carrello';
  prodottiRef: AngularFireList<Prodotto>;

  items = [];

  constructor(private db: AngularFireDatabase) {
    this.prodottiRef = db.list(this.dbPath);
  }


  getAll(): AngularFireList<Prodotto> {
    return this.prodottiRef;
  }

  create(prodotto: Prodotto): any {
    return this.prodottiRef.push(prodotto);
  }


  clearCart() {
    this.items = [];
    return this.items;
  }



  deleteAll(): Promise<void> {
    return this.prodottiRef.remove();
  }
}
