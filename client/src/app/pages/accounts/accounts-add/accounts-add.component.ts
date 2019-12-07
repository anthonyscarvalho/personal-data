import { Component, OnInit, ViewChild } from '@angular/core';

// interfaces
import { TransactionsInterface } from '../../../interfaces/transactions';

// services
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-accounts-add',
  templateUrl: './accounts-add.component.html',
  styleUrls: ['./accounts-add.component.scss']
})
export class AccountsAddComponent implements OnInit {
  @ViewChild('file', { static: false }) _file;

  accountType: number = 1;
  transactions: TransactionsInterface[] = [];
  dataRows: number = 0;
  totalCount: number = 0;
  addedRecords: number = 0;
  existingRecords: number = 0;
  removedRecords: number = 0;

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {

  }

  process(pEvent) {
    const files: { [key: string]: File } = this._file.nativeElement.files;
    const _totalFiles = Number(files.length);
    this.transactions = [];
    this.totalCount = 0;
    this.addedRecords = 0;
    this.existingRecords = 0;
    this.removedRecords = 0;
    for (let a = 0; a < _totalFiles; a++) {
      let reader = new FileReader();
      reader.readAsText(files[a]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        const totalRecords = csvRecordsArray.length;
        this.totalCount = this.totalCount + Number(totalRecords);
        let accountNumber: string = '';
        let statementId: number = null;
        let accountDescription: string = null;

        for (let a = 0; a < totalRecords; a++) {
          let currentRecord = (<string>csvRecordsArray[a]).split(',');
          const _tmp = {
            statementId: (statementId ? statementId : null),
            accountDescription: (accountDescription ? accountDescription : null),
            account: (accountNumber ? accountNumber : null),
            date1: null,
            date2: null,
            description: null,
            amount: null,
            amountOut: null,
            balance: null,
            serviceFee: null
          };
          let _tmpAmount;
          if (currentRecord[0].includes("Account")) {
            if (!currentRecord[0].includes("Description")) {
              accountNumber = currentRecord[1].trim();
            } else if (currentRecord[0].includes("Description")) {
              accountDescription = currentRecord[1];
            }
          }
          if (currentRecord[0].includes("Statement Number ")) {
            statementId = Number(currentRecord[1]);
          }
          if (currentRecord.length >= 4) {
            switch (Number(this.accountType)) {
              case 1: //FNB accounts
              case 2: //eBucks
                _tmpAmount = (currentRecord[1] ? parseInt(currentRecord[1].trim()) : null);
                _tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
                _tmp.amount = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
                _tmp.amountOut = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
                _tmp.balance = (currentRecord[2] ? parseInt(currentRecord[2].trim()) : null);
                _tmp.description = (currentRecord[3] ? currentRecord[3].trim() : null);
                break;
              case 3: //Nedbank cheque
              case 5: //Nedbank savings
                _tmpAmount = (currentRecord[2] ? parseInt(currentRecord[2].trim()) : null);
                _tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
                _tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
                _tmp.amount = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
                _tmp.amountOut = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
                _tmp.balance = (currentRecord[3] ? parseInt(currentRecord[3].trim()) : null);
                _tmp.serviceFee = (currentRecord[4] ? (currentRecord[4].trim() == "#" ? true : null) : null);
                break;
              case 4: //Nedbank credit
                _tmpAmount = (currentRecord[5] ? parseInt(currentRecord[5].trim()) : null);
                _tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
                _tmp.date2 = (currentRecord[1] ? currentRecord[1].trim() : null);
                _tmp.description = (currentRecord[2] ? currentRecord[2].trim() : null);
                // blank space
                // blank space
                // _tmp.amount = (currentRecord[5] ? parseInt(currentRecord[5].trim()) : null);
                _tmp.amount = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
                _tmp.amountOut = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
                break;
              case 6: //Nedbank loan - tba
                _tmpAmount = (currentRecord[5] ? parseInt(currentRecord[5].trim()) : null);
                _tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
                _tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
                _tmp.amount = (currentRecord[2] ? parseInt(currentRecord[2].trim()) : null);
                _tmp.balance = (currentRecord[3] ? parseInt(currentRecord[3].trim()) : null);
                break;
              case 7: //Nedbank investment
                _tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
                _tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
                _tmp.amountOut = (currentRecord[2] ? parseInt(currentRecord[2].trim()) : null);
                _tmp.amount = (currentRecord[3] ? parseInt(currentRecord[3].trim()) : null);
                _tmp.balance = (currentRecord[4] ? parseInt(currentRecord[4].trim()) : null);
                break;
            }
            if (_tmp.date1 && !_tmp.date1.includes("Date")) {
              let csvRecord: TransactionsInterface = new TransactionsInterface(_tmp);
              this._httpService.post('api/transaction', csvRecord).then((pResponse: any) => {
                if (!pResponse.errors) {
                  this.transactions.push(csvRecord);
                  this.addedRecords++;
                } else {
                  this.existingRecords++;
                }
              });
            } else {
              this.removedRecords++;
            }
          } else {
            this.dataRows++;
          }
        }
      };

      reader.onerror = function () {
        console.log('error is occurred while reading file!');
      };
    }
  }
}
