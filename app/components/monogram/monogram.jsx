import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  return (
    <div
      aria-hidden
      ref={ref}
      className={classes(styles.monogram, className)}
      {...props}
    >
      <img
  src="/Portfolio_Logo.svg"
  alt="AP Logo"
  className={styles.svg}
/>
    </div>
  );
});
