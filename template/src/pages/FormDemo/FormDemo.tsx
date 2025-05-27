import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import TextArea from '../../components/common/FormElements/TextArea/TextArea';
import { Input } from '../../components/common/FormElements/Input/Input';
import { Select } from '../../components/common/FormElements/Select/Select';
import { Button } from '../../components/common/Button';
import styles from './FormDemo.module.scss';

export const FormDemo = () => {
  const [textValue, setTextValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    setHasError(e.target.value.length > 0 && e.target.value.length < 10);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Form Components Demo</h1>

      <section className={styles.section}>
        <h2>Button Component</h2>
        <div className={styles.variations}>
          <h3>Button Variants</h3>
          <div className={styles.buttonGrid}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="text">Text Button</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="subtle">Subtle Button</Button>
          </div>

          <h3>Button Sizes</h3>
          <div className={styles.buttonGrid}>
            <Button size="small">Small Button</Button>
            <Button size="medium">Medium Button</Button>
            <Button size="large">Large Button</Button>
          </div>

          <h3>Button States</h3>
          <div className={styles.buttonGrid}>
            <Button disabled>Disabled Button</Button>
            <Button error>Error Button</Button>
            <Button url="#">Link (href) Button</Button>
            <Button type="submit">Submit Button</Button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Input Component</h2>
        <div className={styles.componentDemo}>
          <Input
            label="Email Address"
            placeholder="Enter your email address..."
            value={inputValue}
            onChange={handleInputChange}
            icon={Mail}
            helperText="We'll never share your email"
            required
          />
        </div>

        <div className={styles.variations}>
          <h3>Input Variations</h3>
          <div className={styles.variationGrid}>
            <div>
              <Input label="Username" placeholder="Enter username..." icon={User} size="small" />
            </div>
            <div>
              <Input label="Password" type="password" placeholder="Enter password..." icon={Lock} />
            </div>
            <div>
              <Input label="Large Input" placeholder="Large input..." size="large" />
            </div>
            <div>
              <Input
                label="With Error"
                placeholder="Error state..."
                error="This field has an error"
              />
            </div>
            <div>
              <Input label="Disabled" placeholder="Disabled state..." disabled />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Select Component</h2>
        <div className={styles.componentDemo}>
          <Select
            label="Select Option"
            placeholder="Choose an option..."
            value={selectValue}
            onChange={handleSelectChange}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]}
            required
          />
        </div>

        <div className={styles.variations}>
          <h3>Select Variations</h3>
          <div className={styles.variationGrid}>
            <div>
              <Select
                label="Small Size"
                placeholder="Small select..."
                size="small"
                options={[
                  { value: 'small1', label: 'Small Option 1' },
                  { value: 'small2', label: 'Small Option 2' },
                ]}
              />
            </div>
            <div>
              <Select
                label="With Error"
                placeholder="Error state..."
                error="This field has an error"
                options={[
                  { value: 'error1', label: 'Error Option 1' },
                  { value: 'error2', label: 'Error Option 2' },
                ]}
              />
            </div>
            <div>
              <Select
                label="Disabled"
                placeholder="Disabled state..."
                disabled
                options={[
                  { value: 'disabled1', label: 'Disabled Option 1' },
                  { value: 'disabled2', label: 'Disabled Option 2' },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>TextArea Component</h2>
        <div className={styles.componentDemo}>
          <TextArea
            label="Description"
            placeholder="Enter your description..."
            value={textValue}
            onChange={handleTextChange}
            error={hasError ? 'Description must be at least 10 characters' : ''}
            helperText="Please provide a detailed description"
            maxLength={200}
            showCount
            required
          />
        </div>

        <div className={styles.variations}>
          <h3>TextArea Variations</h3>
          <div className={styles.variationGrid}>
            <div>
              <TextArea label="Small Size" placeholder="Small textarea..." size="small" />
            </div>
            <div>
              <TextArea label="Medium Size (Default)" placeholder="Medium textarea..." />
            </div>
            <div>
              <TextArea label="Large Size" placeholder="Large textarea..." size="large" />
            </div>
            <div>
              <TextArea
                label="With Error"
                placeholder="Error state..."
                error="This field has an error"
              />
            </div>
            <div>
              <TextArea label="Disabled" placeholder="Disabled state..." disabled />
            </div>
            <div>
              <TextArea
                label="With Helper Text"
                placeholder="Helper text example..."
                helperText="This is some helper text"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Form with Button Integration</h2>
        <div className={styles.componentDemo}>
          <form>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <Input label="Username" placeholder="Enter your username" required />
            </div>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <Input label="Password" type="password" placeholder="Enter your password" required />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default FormDemo;
