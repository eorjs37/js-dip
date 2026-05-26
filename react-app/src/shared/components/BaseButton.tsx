type BaseButtonProps = {
  text: string;
  disabled?: boolean;
  onClick: () => void;
};
function BaseButton({ text, disabled, onClick }: BaseButtonProps) {
  return (
    <button
      className="
        flex items-center gap-2
        rounded-lg
        bg-blue-600
        px-4 py-2
        text-white
        disabled:opacity-50
      "
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default BaseButton;
