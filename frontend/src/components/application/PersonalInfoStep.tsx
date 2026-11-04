import { Input } from '../ui/input';

export function PersonalInfoStep() {
  return (
    <div className="form-grid">
      <label>First name<Input name="firstName" required /></label>
      <label>Last name<Input name="lastName" required /></label>
      <label>Date of birth<Input name="dateOfBirth" type="date" required /></label>
      <label>Email<Input name="email" type="email" required /></label>
      <label>Phone<Input name="phone" type="tel" required /></label>
    </div>
  );
}