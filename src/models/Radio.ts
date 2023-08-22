import {IProgram} from './Program';

export interface IRadioProgram {
  startTime: string;
  name: string;
  id: number;
  endTime: string;
  date: string;
}

export interface IRadio {
  url?: string;
  programs?: IProgram[];
  name: string;
  id: number;
  cover?: string;
}
