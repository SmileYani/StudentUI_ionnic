import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  subscription: Subscription;
  dataList: any = [];
  id: any;

  constructor(private studentSV: StudentService,
    private route: Router,
    private alertController: AlertController) {
    this.showData();
  }

  showData() {
    this.subscription = this.studentSV.getStudents()
      .subscribe(data => {
        this.dataList = data
      });
  }

  gotoaddDataStudent() {
    this.route.navigateByUrl("add-data-student");
  }


  async onDelete(id) {
    const alert = await this.alertController.create({
      header: 'ยืนยันการลบข้อมูล',
      buttons:
        [{
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.studentSV.deleteStudent(id).subscribe();
            setTimeout(() => {
              this.showData();
            }, 1000);
          }
        }]
    });
    await alert.present();
  }
}

