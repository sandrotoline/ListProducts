import { Component } from '@angular/core';
import { Item } from 'src/app/Itens';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  
  refreshTable(){
    this.itens = JSON.parse(localStorage.getItem('dbItens')  || '{}');
  }

  updateItem(data:any){
    this.router.navigateByUrl(`item/${data.id}/editar`);
  }
  cadastrarNovoItem(){
    this.router.navigateByUrl('/item');
  }

  deleteItem(data:any){    
   Swal.fire({
    title: 'Tem certeza ?',
    text: "Os dados serão removidos",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        const newItens = this.itens.filter(x => x.id != data.id);
        localStorage.setItem('dbItens', JSON.stringify(newItens));
        this.refreshTable();
      }
    })
  }
  

}
