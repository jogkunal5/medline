import { Component, TemplateRef, OnInit, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ColumnService } from './column.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private modalRef: BsModalRef;

  columnData: any;
  selectedIds = [];

  constructor(private modalService: BsModalService, private colService: ColumnService, private elRef: ElementRef) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.colService.getDataFromApi().subscribe(result => {
      return this.columnData = result;
    }, error => {
      console.log(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addColumn(form: NgForm) {
    let id = this.columnData.length + 1;
    form.value.id = id.toString();
    this.columnData.push(form.value);
    this.hideModalBox();
  }

  selectAll(event) {
    let checkbox = this.elRef.nativeElement.querySelectorAll('.chkbx');
    checkbox.forEach((ele) => {
      if (event.currentTarget.checked) {
        ele.checked = true;
        this.selectedIds.push(ele.value);
      } else {
        ele.checked = false;
        this.selectedIds = [];
      }
    });
  }

  selectColumnIds(id, event) {
    if (event.currentTarget.checked) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(item => id != item);
    }
    this.removeCheckMark();
  }

  deleteColumn() {
    this.selectedIds.forEach((id) => {
      this.columnData = this.columnData.filter(item => item.id != id);
    });
    this.removeCheckMark();
  }

  hideModalBox() {
    this.modalRef.hide();
  }

  removeCheckMark() {
    let checkAll = this.elRef.nativeElement.querySelector('.checkAll');
    checkAll.checked = false;
  }

}
