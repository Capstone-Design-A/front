import classNames from 'classnames';
import Container from '../shared/Container';
import styles from './ListPage.module.css';

function ListPage({
  title = '',
  description = '',
  children,
}) {
  return (
    <>
      <div className={classNames(styles.bg)}>
        <div className={styles.texts}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Container className={styles.container}>{children}</Container>
    </>
  );
}

export default ListPage;