import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        StarComponent

    ],
    exports:[
        StarComponent

    ],
    providers:[

    ]
})
export class SharedModule{

}
