import { Button } from '@components/common';
import styles from './Components.module.scss';

const Components = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Components</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Primary Buttons</h2>
        <p className={styles.description}>
          Primary buttons are used for primary actions and call-to-actions. They use the brand's
          primary color and stand out visually.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="primary" size="small">
            Small Primary
          </Button>
          <Button variant="primary" size="medium">
            Medium Primary
          </Button>
          <Button variant="primary" size="large">
            Large Primary
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Secondary Buttons</h2>
        <p className={styles.description}>
          Secondary buttons are used for secondary actions. They use the brand's secondary color and
          provide visual hierarchy.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="secondary" size="small">
            Small Secondary
          </Button>
          <Button variant="secondary" size="medium">
            Medium Secondary
          </Button>
          <Button variant="secondary" size="large">
            Large Secondary
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Outline Buttons</h2>
        <p className={styles.description}>
          Outline buttons are used for secondary actions that require less visual emphasis. They
          maintain brand colors while being more subtle.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="outline" size="small">
            Small Outline
          </Button>
          <Button variant="outline" size="medium">
            Medium Outline
          </Button>
          <Button variant="outline" size="large">
            Large Outline
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Text Buttons</h2>
        <p className={styles.description}>
          Text buttons are used for auxiliary actions. They have no background and are the most
          subtle button variant.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="text" size="small">
            Small Text
          </Button>
          <Button variant="text" size="medium">
            Medium Text
          </Button>
          <Button variant="text" size="large">
            Large Text
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Link Buttons</h2>
        <p className={styles.description}>
          Link buttons are used to navigate to other pages or external links. They appear as
          traditional hyperlinks but maintain button behaviors.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="link" size="small">
            Small Link
          </Button>
          <Button variant="link" size="medium">
            Medium Link
          </Button>
          <Button variant="link" size="large">
            Large Link
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Button States</h2>
        <p className={styles.description}>
          All button variants support different states including disabled, hover, focus, and active
          states. Here are examples of disabled states.
        </p>
        <div className={styles.buttonGroup}>
          <Button variant="primary" disabled>
            Disabled Primary
          </Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="text" disabled>
            Disabled Text
          </Button>
          <Button variant="link" disabled>
            Disabled Link
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Components;
