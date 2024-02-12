import styles from "./BackgroundPattern.module.css";

function BackgroundPattern() {
  return (
    <div className={styles.pattern}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1440"
        height="960"
        fill="none"
        viewBox="0 0 1440 960"
      >
        <circle cx="-50.5" cy="75.5" r="416.5" stroke-width="144" />
        <circle cx="1388.5" cy="840.5" r="416.5" stroke-width="144" />
      </svg>
    </div>
  );
}

export default BackgroundPattern;
