import { ApiProperty } from '@nestjs/swagger';

export class GetCurrencyImageRequestDto {
  @ApiProperty()
  currencyName: string;
}
