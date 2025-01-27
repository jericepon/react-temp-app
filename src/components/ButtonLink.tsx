import { FC, ReactNode } from "react";
import { NavLink } from "react-router";
type VariantTypes = "primary" | "secondary";
const ButtonLink: FC<{ children: ReactNode; variant?: VariantTypes; to: string; className?: string }> = ({
  children,
  variant = "primary",
  to,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={`
        inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-${variant} text-${variant}-foreground hover:bg-${variant}/90 h-10 px-4 py-2 mt-8
        ${className}
        `}
    >
      {children}
    </NavLink>
  );
};

export default ButtonLink;
