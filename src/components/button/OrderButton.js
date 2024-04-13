// 상품 상세 페이지의 바로구매 버튼
import classNames from 'classnames';
import styles from './OrderButton.module.css';

function OrderButton({ variant, className, as, ...restProps }) {
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

export default OrderButton;