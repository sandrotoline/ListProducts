import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListProductsComponent } from "./components/list-products/list-products.component";
import { FormProductsComponent } from "./components/form-products/form-products.component";

const routes : Routes = [
    {
        path: '',
        component: ListProductsComponent
    },
    {
        path: 'item',
        component: FormProductsComponent
    },
    {
        path: 'item/:id/editar',
        component: FormProductsComponent
    }
]

@NgModule ({
    declarations:[],
    imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
    exports: [RouterModule]
})

export class AppRoutingModule {}