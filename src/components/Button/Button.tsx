import styles from './Button.module.scss';
import type { ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
};

export const Button = ({ children, onClick, className = '', type = 'button' }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`${styles.button} ${className}`}
			type={type}
		>
			{children}
		</button>
	);
};