import { Component, OnInit } from '@angular/core';
import {Prodotto} from 'src/app/models/prodotto.model';
import { ProdottoService } from 'src/app/services/prodotto.service';
import { map } from 'rxjs/operators';
import { CartService } from '../../cart.service';


@Component({
  selector: 'app-lista-prodotto',
  templateUrl: './lista-prodotto.component.html',
  styleUrls: ['./lista-prodotto.component.css']
})
export class ListaProdottoComponent implements OnInit {

  Listaprodotti:boolean;

  prodotti?: Prodotto[];
  prodottiDaFiltrare?: Prodotto[];
  currentIndex = -1;
  name = '';

  currentProdotto?: Prodotto = {
    name: '',
    description: '',
    price:null,
    available: false,
    url:''
  };

  url:string;

  constructor(private prodottoService: ProdottoService,
              private cartService: CartService) { }

  ricerca :string;
  receiveRicerca($event) {
    this.ricerca = $event
    this.currentProdotto = undefined;
    this.currentIndex = -1;
    this.prodotti=this.prodottiDaFiltrare.filter(x => x.name.toLowerCase().includes(this.ricerca));
    console.log(this.prodotti);
    console.log(this.prodottiDaFiltrare);
  }

  ngOnInit(): void {
    this.retrieveProdotti();
    this.Listaprodotti=true;
    this.currentProdotto=null;
  }


  addToCart(currentProdotto) {
    this.cartService.create(currentProdotto);
    window.alert('Prodotto aggiunto al carrello!');
  }

  refreshList(): void {
    this.currentProdotto = undefined;
    this.currentIndex = -1;
    this.retrieveProdotti();
  }

  retrieveProdotti(): void {
    this.prodottoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
     this.prodottiDaFiltrare = this.prodotti = data;
    });

  }

  setActiveProdotto(prodotto: Prodotto, index: number): void {
    this.currentProdotto = prodotto;
    this.currentIndex = index;
    this.Listaprodotti=false;
  }

  setActiveProdotto2(prodotto: Prodotto, index: number): void {
    this.currentProdotto = prodotto;
    this.currentIndex = index;
    this.addToCart(this.currentProdotto);
  }

  removeAllProdotti(): void {
    this.prodottoService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

}
