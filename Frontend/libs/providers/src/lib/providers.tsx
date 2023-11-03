import styles from './providers.module.css';

/* eslint-disable-next-line */
export interface ProvidersProps {}

export function Providers(props: ProvidersProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Providers!</h1>
    </div>
  );
}

export default Providers;
