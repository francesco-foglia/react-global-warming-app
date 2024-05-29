interface Props {
  errorMessage: string;
}

export default function ErrorMessage(props: Props) {
  return (
    <p className="text-center m-auto text-red-500">{props.errorMessage}</p>
  );
}
