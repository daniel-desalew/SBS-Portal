import { findApplicationStatus } from '../applications/applications.service';

export const lookupStatus = (referenceNumber: string, email: string) =>
  findApplicationStatus(referenceNumber, email);