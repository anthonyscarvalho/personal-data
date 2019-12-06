import { Component, OnInit, ViewChild } from '@angular/core';

// interfaces
import { TransactionsInterface } from '../../../interfaces/transactions';

@Component({
  selector: 'app-accounts-add',
  templateUrl: './accounts-add.component.html',
  styleUrls: ['./accounts-add.component.scss']
})
export class AccountsAddComponent implements OnInit {
  @ViewChild('file', { static: false }) _file;

  transactions: TransactionsInterface[] = [];
  account: string;

  constructor() { }

  ngOnInit() {

  }

  process(pEvent) {
    const files: { [key: string]: File } = this._file.nativeElement.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);
    this.transactions = [];

    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

      console.log(csvRecordsArray);
      const totalRecords = csvRecordsArray.length;
      for (let a = 0; a < totalRecords; a++) {
        let currentRecord = (<string>csvRecordsArray[a]).split(',');
        if (currentRecord.length == 2 && (currentRecord[0].includes("Account Number"))) {
          this.account = currentRecord[1];
        }
        if (currentRecord.length > 4) {

          let csvRecord: TransactionsInterface = new TransactionsInterface();
          csvRecord.id = null;
          csvRecord.account = (this.account ? this.account : null)
          csvRecord.date = currentRecord[0].trim();
          csvRecord.description = currentRecord[1].trim();
          csvRecord.amount = parseInt(currentRecord[2].trim());
          this.transactions.push(csvRecord);
        }
      }
      // let headersRow = this.getHeaderArray(csvRecordsArray);

      // this.transactions = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
    };

    reader.onerror = function () {
      console.log('error is occurred while reading file!');
    };
  }
}
