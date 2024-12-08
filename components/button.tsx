interface ButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ icon, children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-foreground w-fit flex items-center gap-2"
    >
      {icon ? icon : null}
      {children}
    </button>
  );
}
