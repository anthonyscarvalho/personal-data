import { ApiProperty } from '@nestjs/swagger';

export class GetCurrencyImagesRequestDto {
  @ApiProperty({ type: [String] })
  currencyNames: string[];
}
