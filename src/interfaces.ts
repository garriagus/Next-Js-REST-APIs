// interfaces.ts

export interface Area {
  id: number;
  areaName: string;
  employees: EmployeeResponse[];
  doors: Door[];
}

export interface Door {
  id: number;
  ipAddress: string;
  doorName: string;
  area: Area;
  rfidKeyDoors: RFIDKeyDoorMapping[];
}

export interface EmployeeResponse {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  joiningDate: string; // Consider using a Date type instead of string
  retiringDate: string; // Consider using a Date type instead of string
  noOfChildren: number;
  area: Area;
  rfidKey: RFIDKey;
}

export interface RFIDKey {
  id: number;
  serialNumber: string;
  keyType: 'KEY_RING' | 'CARD';
  joiningDate: string; // Consider using a Date type instead of string
  employee: EmployeeResponse;
  rfidKeyDoors: RFIDKeyDoorMapping[];
}

export interface RFIDKeyDoorMapping {
  id: number;
  rfidKey: RFIDKey;
  door: Door;
}
