import { Input } from '../ui/input';

export function GuardianStep() {
  return <div className="form-grid"><label>Guardian full name<Input name="guardianName" required /></label><label>Guardian phone<Input name="guardianPhone" type="tel" required /></label></div>;
}