export default function ErrorMessage(props: ErrorMessageProps) {
	const { message } = props;
	return <div className="error-message">{message}</div>;
}
interface ErrorMessageProps {
	message: string;
}
