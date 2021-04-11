import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

/**
 * DTO
 *
 * Used in controller and services
 */
export class CreateProgramDTO {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly category: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly campus: string;
}

export class UpdateProgramDTO {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly category: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly campus: string;
}

/**
 * Body
 *
 * Used for Open API
 */

export class CreateProgramBody {
  @ApiProperty()
  program: CreateProgramDTO;
}

export class UpdateProgramBody {
  @ApiProperty()
  program: UpdateProgramDTO;
}
