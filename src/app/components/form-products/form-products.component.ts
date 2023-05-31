import { Item } from 'src/app/Itens';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import Inputmask from 'inputmask';



@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }
    
    inputmask: any;
    itens! :Item[];
    formItem! : FormGroup;
    showPerecivel:boolean= false;
    dataFabInvalid!: boolean;
    dataValInvalid!: boolean;
    dataFab!: string;
    dataVal!: string;
    dataAtual!: Date;
    medida! : string;

    toggleInputPerecivel() {
      this.showPerecivel = !this.showPerecivel;
    }

    ngAfterViewInit() {
      this.inputmask = new Inputmask('decimal', {
              prefix: "",
              groupSeparator: ".",
              alias: "numeric",
              digits: 2,
              radixPoint: ",",
              digitsOptional: !1
            });
      this.inputmask.mask(document.getElementById('price'));
    }
    changeMedida(){
      this.medida =  this.formItem.get('un')?.value;
    }
    verificarDataFab() {
      this.dataAtual = new Date(); // Obter a data atual
      this.dataFab =  this.formItem.get('fab')?.value;

      if (new Date(this.dataFab) > this.dataAtual) {
        this.dataFabInvalid = true;
      } else {
        this.dataFabInvalid = false;
      }
    }
    verificarDataVal() {
      this.dataAtual = new Date(); // Obter a data atual
      this.dataVal =  this.formItem.get('val')?.value;

      if (new Date(this.dataVal) < this.dataAtual) {
        this.dataValInvalid = true;
      } else {
        this.dataValInvalid = false;
      }
    }
  
    ngOnInit(){

      if(localStorage.getItem('dbItens')){
        this.itens = JSON.parse(localStorage.getItem('dbItens')  || '{}');
      }else{
        this.itens = [];
      }
      if ( this.route.snapshot.url.join('/').includes('/editar')) {
        this.route.params.subscribe(params => {
          const id = params['id'];
          const data = this.itens.find(x => x.id === id);
          this.showPerecivel = data?.IsPerecivel!;
          this.medida = data?.un!;
          this.formItem = new FormGroup({ 
            id: new FormControl(id),
            name: new FormControl(data?.name, [Validators.required]),
            price: new FormControl(data?.price, [Validators.required]),
            qtd: new FormControl(data?.qtd, [Validators.required]),
            un: new FormControl(data?.un,[Validators.required]),
            IsPerecivel: new FormControl(data?.IsPerecivel),
            fab: new FormControl(data?.fab,[Validators.required]),
            val: new FormControl(data?.val),
          });
        });
      } else{
        this.formItem = new FormGroup({ 
          id: new FormControl(),
          name: new FormControl('', [Validators.required]),
          price: new FormControl('', [Validators.required]),
          qtd: new FormControl('', [Validators.required]),
          un: new FormControl('',[Validators.required]),
          IsPerecivel: new FormControl(),
          fab: new FormControl('',[Validators.required]),
          val: new FormControl(),
        });
      }
 
    }

    get name(){
      return this.formItem.get('name')!;
    }
    get price(){
      return this.formItem.get('price')!;
    }
    get qtd(){
      return this.formItem.get('qtd')!;
    }
    get un(){
      return this.formItem.get('un')!;
    }
    get fab(){
      return this.formItem.get('fab')!;
    }


  cancelar(e:Event){
      e.stopPropagation();

      Swal.fire({
        title: 'Tem certeza ?',
        text: "Os dados serão perdidos e o item não será salvo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/');
        }
      })
  }

    
    cadastrarItem() {
    if(this.formItem.invalid){
      console.log('Formulario Invalido');
      return ;
    }
    else if(this.showPerecivel && this.formItem.get('val')?.value == null){
      console.log('é percecivel e nao tem data');
      return ;
    }else if(this.dataFabInvalid){
      console.log('Data de Fabricação Invalida');
      return ;
    } else if(this.dataValInvalid){
      console.log('Data de Validade Invalida');
      return ;
    }else{
      if(this.route.snapshot.url.join('/').includes('/editar')){
        
        this.route.params.subscribe(params => {
          this.formItem.value.id = params['id'];
          const item : Item = this.formItem.value;
          this.itens[this.itens.findIndex(x => x.id ===  params['id'])] = item;
          localStorage.setItem("dbItens", JSON.stringify(this.itens));
        
          Swal.fire({
            title: 'Alterado',
            text: 'Seu item foi alterado com sucesso.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
          })
        });
      }else{

        this.formItem.value.id = Guid.create().toString();
        const item : Item = this.formItem.value;
        this.itens.push(item);
        localStorage.setItem("dbItens", JSON.stringify(this.itens));
        this.formItem.reset();

        Swal.fire({
          title: 'Inserido',
          text: 'Seu item foi inserido com sucesso.',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        })
        setTimeout(()=>{this.router.navigateByUrl('/');}, 3000)
      }
    }
    
    }
    

}
