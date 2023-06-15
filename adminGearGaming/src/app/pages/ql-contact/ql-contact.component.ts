import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Contact } from 'src/app/entity/Contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Common } from 'src/app/shared/Common';

@Component({
  selector: 'app-ql-contact',
  templateUrl: './ql-contact.component.html',
  styleUrls: ['./ql-contact.component.css']
})
export class QlContactComponent implements OnInit {
  searchForm!: FormGroup;
  isVisible = false;
  total = 1;
  loading = true;
  pageSize = 5;
  pageIndex = 1;
  listOfData: Contact[] = [];
  controlArray: Map<string, any> = new Map<string, any>();
  contactId: string;
  contact: Contact;
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    //form search
    this.searchForm = this.fb.group({
      contactName: [null],
      contactEmail: [null],
      status: [null],
    });
  }


 

  search() {
    const name = this.searchForm.controls.contactName.value;
    const email = this.searchForm.controls.contactEmail.value;
    const status = this.searchForm.controls.status.value;
    this.controlArray.set('contactName', name);
    this.controlArray.set('contactEmail', email);
    this.controlArray.set('status', status);
    this.getContacts(this.pageIndex, this.pageSize, null, null);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.getContacts(pageIndex, pageSize, sortField, sortOrder);
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  getContacts(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null
  ) {
    this.controlArray.set('pageIndex', pageIndex);
    this.controlArray.set('pageSize', pageSize);
    this.controlArray.set('sortField', sortField);
    this.controlArray.set('sortOrder', sortOrder);
    // get bill
    this.contactService.getContacts(this.controlArray).subscribe(
      (data) => {
        if (data && data.results) {
          this.loading = false;
          this.listOfData = data.results;
          this.total = data.rowCount;
        }
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      }
    );
  }
  
  
  changeStatus(e, contact) {
    this.contact = contact;
    this.contact.status = e;
    this.contactService.saveContact(this.contact).subscribe(
      (data) => {
        this.createNotification('success', 'Thay đổi thành công!', '');
      },
      (error) => {
        this.createNotification(
          'error',
          'Có lỗi xảy ra!',
          'Vui lòng liên hệ quản trị viên.'
        );
      },
      () => {
        this.getContacts(this.pageIndex, this.pageSize, null, null);
      }
    );
  }
  
}
