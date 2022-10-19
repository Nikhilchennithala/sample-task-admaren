import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  personalDetails: FormGroup;
  addressDetails: FormGroup;
  cardDetails: FormGroup;
  personal_step = false;
  address_step = false;
  card_step = false;
  step = 1;
  constructor(private fb: FormBuilder,
              private router: Router,
              private dataService: DataServiceService) { }

  ngOnInit() {
    this.createPersoneDetailsForm();
    this.createAddressDetailsForm();
    this.createCardDetailsForm();
  }
  createPersoneDetailsForm(): void {
    this.personalDetails = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  createAddressDetailsForm(): void {
    this.addressDetails = this.fb.group({
      billingAddress: ['', Validators.required],
      pincode: ['', Validators.required],
      phone: ['',Validators.required]
    });
  }

  createCardDetailsForm(): void {
    this.cardDetails = this.fb.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      secureCode: ['',Validators.required],
      nameOnCard: ['',Validators.required]
    });
  }

  
  get personal() { return this.personalDetails.controls; }
  get address() { return this.addressDetails.controls; }
  get card() { return this.cardDetails.controls; }

  next(){
    if(this.step==1){
          this.personal_step = true;
          if (this.personalDetails.invalid) { return  }
          this.step++
    }
    if(this.step==2){
        this.address_step = true;
        if (this.addressDetails.invalid) { return }
            this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.card_step = false;
    }
  }
  submit(){
    if(this.step==3){
      this.card_step = true;
      if (this.cardDetails.invalid) { return };
      this.router.navigate(['show-details']);
    }
    let data = this.formDetails();
    this.sendNewData(data);
  }
  formDetails(): any {
    console.log( this.personalDetails.controls, this.addressDetails.controls, this.cardDetails.controls)
    const NAME = this.personalDetails.controls.name.value;
    const USERNAME = this.personalDetails.controls.username.value;
    const BILLINGADDRESS = this.addressDetails.controls.billingAddress.value;
    const PINCODE = this.addressDetails.controls.pincode.value;
    const PHONE = this.addressDetails.controls.phone.value;
    const CARDNUMBER = this.cardDetails.controls.cardNumber.value;
    const EXPIRYDATE = this.cardDetails.controls.expiryDate.value;
    const SECURECODE = this.cardDetails.controls.secureCode.value;
    const NAMEONCARD = this.cardDetails.controls.nameOnCard.value;
    let datas = [];
    datas.push({name: NAME, username: USERNAME, billing: BILLINGADDRESS, pincode: PINCODE, phone: PHONE, cardnumber: CARDNUMBER, expirydate: EXPIRYDATE, securecode: SECURECODE, nameoncard: NAMEONCARD});
    return datas;
  }
  sendNewData(data: string) {
    this.dataService.sendData(data);
  }
}
