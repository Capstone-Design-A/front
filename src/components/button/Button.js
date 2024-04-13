// 페이지 전체에서 사용할 기본 버튼
import classNames from 'classnames';
import styles from './Button.module.css';

function Button({ variant, className, as, ...restProps }) {
  if (as === 'div') {
    return (
      <div
        {...restProps}
        className={classNames(
          styles.button,
          variant && styles[variant],
          className,
        )}
      />
    );
  }

  return (
    <button
      {...restProps}
      className={classNames(
        styles.button,
        variant && styles[variant],
        className,
      )}
    />
  );
}

export default Button;