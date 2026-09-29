import { EyeCloseIcon, EyeOpenIcon } from "@/components/icons/svgIcons";
export default function PasswordEyeReverse({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      {showPassword ? (
        <button
          type="button"
          className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          <EyeCloseIcon />
          <div className="sr-only">Hide password</div>
        </button>
      ) : (
        <button
          type="button"
          className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          <EyeOpenIcon />
          <div className="sr-only">Show password</div>
        </button>
      )}
    </div>
  );
}
