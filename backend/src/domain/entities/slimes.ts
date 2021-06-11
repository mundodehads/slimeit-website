import {
  attribute,
  table
} from '@aws/dynamodb-data-mapper-annotations';
import { IsNotEmpty } from 'class-validator';

@table('Slimes')
export default class Slime {
  @IsNotEmpty()
  @attribute()
  public accountNumber!: number;

  @IsNotEmpty()
  @attribute()
  public username!: string;

  @IsNotEmpty()
  @attribute()
  public currentlyPlayingAt!: string;

  @attribute()
  public slimeData?: any;

  constructor() {}
}
