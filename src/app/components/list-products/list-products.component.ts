import { Component } from '@angular/core';
import { Item } from 'src/app/Itens';
import { Router } from '@angular/router';
import { Input } from '@material-ui/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  itens! :Item[];
  constructor(private router: Router) { }

   ngOnInit(){
    if(localStorage.getItem('dbItens')){
      this.itens = JSON.parse(localStorage.getItem('dbItens')  || '{}');
    }
  }
  
  updateItem(data:any){
    this.router.navigateByUrl(`item/${data.id}/editar`);
  }

}
