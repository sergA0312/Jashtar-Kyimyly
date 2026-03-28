// src/shared/ui/MultiContainer.tsx
import { FC, ReactNode } from "react";
import clsx from 'clsx'
import styles from "./MultiContainer.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

export const MultiContainer: FC<Props> = ({ children, className }) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};
