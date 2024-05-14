import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Planta } from '../../../models/planta';
import { PlantaService } from '../../../servicios/planta.service';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { FilterPipe } from '../pipes/filter.pipe';
import { SelectService } from '../../../servicios/select.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipe,
    RouterOutlet,
  ],
  providers: [CookieService, SelectService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public inputContentMotivo: any;
  public inputContentMotivoImg: any;
  formValueAgregar!: FormGroup;
  formValue!: FormGroup;
  plantaModelObj: Planta = new Planta();
  plantaModel: Planta = new Planta();
  plantaData!: any;
  CantidadAlertasVerdes: number = 0;
  CantidadAlertasAmarillas: number = 0;
  CantidadAlertasRojas: number = 0;
  CantidadSensoresDeshabilitados: number = 0;
  cookieValue!: any;
  paises: any = [];
  opcionSeleccionada: string = '';
  public filterPost: string = '';
  paisElegido!: any;
  imagenBanderaElegida: any;
  tarjetasInferioresData$!: Observable<any>;

  constructor(
    private plantaService: PlantaService,
    private route: Router,
    private formBuilder: FormBuilder,
    private render2: Renderer2,
    private cookieService: CookieService,
    private http: HttpClient,
    private selectService: SelectService
  ) {
    selectService.traerSelectPersonalizado(['select-personalizado']);
    // this.cookieService.set('Test', 'Hello World');
    this.cookieValue = this.cookieService.get('usuario');
    console.log(this.cookieValue);
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      pais: [''],
      paisImagen: [''],
      nombrePlanta: [''],
      lecturas: [''],
      alertasMedias: [''],
      alertasRojas: [''],
      alertasVerdes: [''],
    });
    this.getAllPlanta();

    this.formValueAgregar = this.formBuilder.group({
      pais: [''],
      paisImagen: [''],
      nombrePlanta: [''],
      lecturas: [''],
      alertasMedias: [''],
      alertasRojas: [''],
      alertasVerdes: [''],
    });
    this.getAllCountries();

    // DATOS DE LAS TARJETAS INFERIORES QUE NO TIENEN BASE DE DATOS
    this.tarjetasInferioresData$ = of([
      {
        temperatura: 1.5,
        presion: 126,
        viento: 15.305,
        niveles: 3.1,
        energia: 145.6,
        tension: 14.56,
        monoxidoCarbono: 1.456,
        otrosGases: 31.56,
      },
    ]);
  }

  adminBoton(route: string) {
    return this.route.url === route;
  }

  postPlantaDetails() {
    this.plantaModel.pais = this.paisElegido;
    this.plantaModel.paisImagen = this.imagenBanderaElegida;
    this.plantaModel.nombrePlanta = this.formValueAgregar.value.nombrePlanta;
    this.plantaModel.lecturas = this.formValueAgregar.value.lecturas;
    this.plantaModel.alertasMedias = this.formValueAgregar.value.alertasMedias;
    this.plantaModel.alertasRojas = this.formValueAgregar.value.alertasRojas;
    this.plantaModel.alertasVerdes = this.formValueAgregar.value.alertasVerdes;
    console.log(typeof this.paisElegido);
    this.plantaService.postPlanta(this.plantaModel).subscribe((res) => {
      this.formValueAgregar.reset();
      window.location.reload();
    });
  }

  getAllPlanta() {
    this.plantaService.getsPlanta().subscribe((res) => {
      this.plantaData = res;
      console.log(res);
      this.totalLecturas();
    });
  }
  totalLecturas() {
    for (let i = 0; i < this.plantaData.length; i++) {
      let cantidadVerdes = this.plantaData[i].alertasVerdes;
      this.CantidadAlertasVerdes += cantidadVerdes;

      let cantidadAmarillas = this.plantaData[i].alertasMedias;
      this.CantidadAlertasAmarillas += cantidadAmarillas;

      let cantidadRojas = this.plantaData[i].alertasRojas;
      this.CantidadAlertasRojas += cantidadRojas;

      let cantidadDeshabilitados = this.plantaData[i].sensoresDeshabilitados;
      this.CantidadSensoresDeshabilitados += cantidadDeshabilitados;
    }
  }

  deletePlanta(planta: any) {
    this.plantaService.deletePlanta(planta.id).subscribe((res) => {
      window.location.reload();
    });
  }

  onEditPlanta(planta: any) {
    this.plantaModelObj.id = planta.id;
    this.formValue.controls['pais'].setValue(planta.pais);
    this.formValue.controls['paisImagen'].setValue(planta.paisImagen);
    this.formValue.controls['nombrePlanta'].setValue(planta.nombrePlanta);
    this.formValue.controls['lecturas'].setValue(planta.lecturas);
    this.formValue.controls['alertasMedias'].setValue(planta.alertasMedias);
    this.formValue.controls['alertasRojas'].setValue(planta.alertasRojas);
    this.formValue.controls['alertasVerdes'].setValue(planta.alertasVerdes);
  }

  actualizarPlanta() {
    this.plantaModelObj.pais = this.formValue.value.pais;
    this.plantaModelObj.paisImagen = this.formValue.value.paisImagen;
    this.plantaModelObj.nombrePlanta = this.formValue.value.nombrePlanta;
    this.plantaModelObj.lecturas = this.formValue.value.lecturas;
    this.plantaModelObj.alertasMedias = this.formValue.value.alertasMedias;
    this.plantaModelObj.alertasRojas = this.formValue.value.alertasRojas;
    this.plantaModelObj.alertasVerdes = this.formValue.value.alertasVerdes;
    this.plantaService
      .updatePlanta(this.plantaModelObj, this.plantaModelObj.id)

      .subscribe((res) => {
        this.formValue.reset();
        window.location.reload();
      });
  }

  getAllCountries() {
    this.http
      .get('https://restcountries.com/v3.1/all')
      .subscribe((res: any) => {
        res.map((country: any) => {
          let pais = {
            nombre: country.name.common,
            bandera: country.flags.svg,
          };
          this.paises.push(pais);
        });
      });
  }

  @ViewChild('opcionesListen', { static: false })
  divOpcionesListen!: ElementRef;
  clicklistenerMotivo: any;

  ngAfterViewInit() {
    // Escuchando el select personalizado de empleado
    this.clicklistenerMotivo = this.render2.listen(
      this.divOpcionesListen.nativeElement,
      'click',
      (evt) => {
        this.inputContentMotivo =
          document.querySelector('.titulo')?.textContent;
        this.inputContentMotivoImg = document.querySelector('.tituloImg');
        let imagen = this.inputContentMotivoImg.src;
        this.paisElegido = this.inputContentMotivo;
        this.imagenBanderaElegida = imagen;
      }
    );
  }

  ngOnDestroy() {
    this.clicklistenerMotivo.unsubscribe();
  }
}
