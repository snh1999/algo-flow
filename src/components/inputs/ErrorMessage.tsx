interface Props {
  errorMessage: string;
}

export default function ErrorMessage({ errorMessage }: Props) {
  return (
    <div className="flex pt-0.5 text-wrap scale-90 text-red-500">
      <span className="small_font">{errorMessage ?? " "}</span>
    </div>
  );
}
