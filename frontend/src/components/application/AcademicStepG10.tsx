import { Input } from '../ui/input';

export function AcademicStepG10() {
  return <div className="form-grid"><label>Grade 9 school<Input name="previousSchool" required /></label><label>Grade 9 result / average<Input name="grade9Result" required /></label><label>Region<Input name="region" required /></label></div>;
}