import Container from "../shared/Container";
import Lined from "../../components/shared/Lined";
import styles from "./ListPage.module.css";

function ListPage({ title = "", description = "", children }) {
  return (
    <>
      <div className={styles.all}>
        <h1 className={styles.title}>
          <Lined>{title}</Lined>
        </h1>
        <p className={styles.description}>{description}</p>
      </div>
      <Container className={styles.container}>{children}</Container>
    </>
  );
}

export default ListPage;
