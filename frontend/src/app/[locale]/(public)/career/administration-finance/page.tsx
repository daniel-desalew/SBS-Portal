import { Breadcrumb } from '../../../../../components/layout/Breadcrumb';
import { Checkbox } from '../../../../../components/ui/checkbox';
import { Input } from '../../../../../components/ui/input';
import { Select } from '../../../../../components/ui/select';
import { Button } from '../../../../../components/ui/button';
import type { Locale } from '../../../../../lib/constants';
import { localePath } from '../../../../../lib/utils';

export default async function AdministrationFinanceCareerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const title =
    currentLocale === 'am'
      ? 'የአስተዳደርና ፋይናንስ ማመልከቻ'
      : 'Administration and Finance Applications';

  return (
    <section className="career-application-page">
      <header className="career-application-banner">
        <div className="container">
          <h1>{title}</h1>
          <Breadcrumb
            items={[
              { label: 'Home', href: localePath(currentLocale) },
              { label: 'Career', href: localePath(currentLocale, '/career') },
              { label: title },
            ]}
          />
        </div>
      </header>
      <div className="container career-application-content">
        <section className="panel career-application-form">
          <div className="career-application-instructions">
            <h2>Instructions:</h2>
            <ul>
              <li>Please fill out all required fields completely and accurately.</li>
              <li>Upload clear, readable copies of all required documents.</li>
              <li>Ensure your email address is correct as it will be used for verification.</li>
            </ul>
          </div>
          <fieldset disabled className="career-application-fields">
            <h2 className="career-application-section-title">Personal Information</h2>
            <div className="form-grid">
              <label>
                Full Name *
                <Input name="fullName" placeholder="Enter your full name" required />
              </label>
              <label>
                Email Address *
                <Input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Phone Number *
                <Input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </label>
              <label>
                Date of Birth (Gregorian) *
                <Input name="dateOfBirth" type="date" required />
              </label>
              <label>
                Gender *
                <Select name="gender" defaultValue="" required>
                  <option value="" disabled>Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </Select>
              </label>
              <label>
                National ID (FAN Number) *
                <Input name="nationalId" placeholder="Enter your FAN number" required />
              </label>
            </div>
            <h2 className="career-application-section-title">Academic Information</h2>
            <div className="form-grid">
              <label>
                Level of Education *
                <Select name="educationLevel" defaultValue="" required>
                  <option value="" disabled>Select Education Level</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelors">Bachelor’s Degree</option>
                  <option value="masters">Master’s Degree</option>
                  <option value="doctorate">Doctorate</option>
                </Select>
              </label>
              <label>
                Field of Study *
                <Input
                  name="fieldOfStudy"
                  placeholder="e.g., Human Resource Management, Business Administration"
                  required
                />
              </label>
              <label>
                Institution *
                <Input name="institution" placeholder="Name of university/college" required />
              </label>
              <label>
                Graduation Year *
                <Input
                  name="graduationYear"
                  type="number"
                  min={1950}
                  max={new Date().getFullYear()}
                  placeholder="e.g., 2020"
                  required
                />
              </label>
              <label>
                GPA *
                <Input name="gpa" type="number" min={0} step="0.01" placeholder="e.g., 3.5" required />
              </label>
            </div>
            <h2 className="career-application-section-title">Professional Experience</h2>
            <div className="form-grid">
              <label>
                Years of Experience *
                <Input name="yearsExperience" type="number" min={0} placeholder="e.g., 5" required />
              </label>
              <label>
                Previous Positions *
                <Input
                  name="previousPositions"
                  placeholder="e.g., HR Officer, HR Manager, Finance Officer"
                  required
                />
              </label>
              <label>
                Specialization *
                <Input
                  name="specialization"
                  placeholder="e.g., Recruitment, Training & Development, Employee Relations"
                  required
                />
              </label>
              <label>
                Preferred Location *
                <Select name="preferredLocation" defaultValue="" required>
                  <option value="" disabled>Select preferred location</option>
                  <option value="addis-ababa">Addis Ababa</option>
                  <option value="afar">Afar</option>
                  <option value="amhara">Amhara</option>
                  <option value="oromia">Oromia</option>
                  <option value="sidama">Sidama</option>
                  <option value="other">Other</option>
                </Select>
              </label>
              <label className="career-upload-field">
                Resume/CV *
                <span className="career-upload-placeholder">
                  Click or drag &amp; drop to upload your CV (PDF format)
                  <Input
                    className="career-file-input"
                    name="resume"
                    type="file"
                    accept=".pdf,application/pdf"
                    required
                  />
                </span>
              </label>
              <label className="career-upload-field">
                9-12 Transcript *
                <span className="career-upload-placeholder">
                  Click or drag &amp; drop to upload your 9-12 transcript
                  <Input
                    className="career-file-input"
                    name="transcript"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    required
                  />
                </span>
              </label>
            </div>
          </fieldset>
          <fieldset disabled className="career-application-agreements">
            <legend className="career-application-section-title">Agreements</legend>
            <label className="career-agreement-option">
              <Checkbox name="willingToRelocate" required />
              I am willing to relocate to any assigned location *
            </label>
            <label className="career-agreement-option">
              <Checkbox name="skillAssessmentConsent" required />
              I consent to take a skill assessment test *
            </label>
          </fieldset>
          <div className="career-application-actions">
            <Button type="button" variant="secondary" disabled>Back</Button>
            <Button type="button" disabled>Review Application</Button>
          </div>
          <p className="career-application-unavailable" role="status">
            Online career applications are not available yet. Please contact us for application
            assistance.
          </p>
        </section>
      </div>
    </section>
  );
}
