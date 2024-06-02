import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent implements AfterViewChecked {
  public titulo!: string;
  public mensaje!: string;

  @ViewChild('content') modalContent!: ElementRef;
  procesoConfirmacion!: () => void;

  constructor(
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef
  ) {}

  openModal(titulo: string, mensaje: string, confirmacion: () => void) {
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.procesoConfirmacion = confirmacion;
    this.modalService.open(this.modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      centered: true,
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  confirmar(modal: NgbModalRef): void {
    this.procesoConfirmacion();
    modal.close();
  }

  cancelar(modal: NgbModalRef): void {
    modal.close();
  }
}
