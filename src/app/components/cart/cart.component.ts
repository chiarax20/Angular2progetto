import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { map } from 'rxjs/operators';
import { Prodotto } from 'src/app/models/prodotto.model';
import { SimplePlaceholderMapper } from '@angular/compiler/src/i18n/serializers/serializer';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items =[];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.AllCart();
  }

  AllCart(): void {
    this.cartService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
     this.items = data;
     this.totale();
    });
  }

  removeAllProdotti(): void {
    this.cartService.deleteAll()
      .catch(err => console.log(err));
  }
  tot: number;

  totale(): void{
    this.tot=0;
    this.items.forEach(element => {
      this.tot= this.tot+ Number(element.price);
      console.log(this.tot)
    });
  }


}
