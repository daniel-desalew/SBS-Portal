import { Input } from '../ui/input';

export function AcademicStepG9() {
  return <div className="form-grid"><label>Previous school<Input name="previousSchool" required /></label><label>Region<Input name="region" required /></label></div>;
}