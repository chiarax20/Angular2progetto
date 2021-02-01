import { Component, OnInit, Inject } from '@angular/core';
import {Prodotto} from 'src/app/models/prodotto.model';
import { ProdottoService } from 'src/app/services/prodotto.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-add-prodotto',
  templateUrl: './add-prodotto.component.html',
  styleUrls: ['./add-prodotto.component.css']
})
export class AddProdottoComponent implements OnInit {

  prodotto: Prodotto = new Prodotto();
  submitted = false;

  constructor(private prodottoService: ProdottoService, @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  saveProdotto(): void {
    this.prodottoService.create(this.prodotto).then(() => {
      console.log('Nuovo oggetto creato con successo!');
      this.submitted = true;
    });
  }

  newProdotto(): void {
    this.submitted = false;
    this.prodotto = new Prodotto();
  }

  selectedImage: any = null;
  url:string;
  id:string;
  file:string;

  ngOnInit() {
  }


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
  save() {
    if(this.prodotto.name!='' && this.prodotto.price!=null){
      const randomId = Math.random().toString(36).substring(2);
    var name = randomId;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.prodotto.url=url;
          this.saveProdotto();
        })
      })
    ).subscribe();
    console.log(this.prodotto);
    } else {
      window.alert("Devi compilare tutti i campi");
    }

  }
}
