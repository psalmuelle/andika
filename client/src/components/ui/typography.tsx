import React from "react";

interface TypographyProps
  extends React.HTMLAttributes<
    HTMLHeadingElement | HTMLParagraphElement | HTMLUListElement | HTMLElement
  > {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "ul" | "code";
}

function Typography({
  children,
  className,
  as = "p",
  ...props
}: TypographyProps) {
  // Dynamically select the element to render based on `as` prop
  const Component = as;

  const elementClasses = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    ul: "my-6 ml-6 list-disc [&>li]:mt-2",
    code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  };

  return (
    <Component
      {...props}
      className={`${elementClasses[as] || ""} ${className || ""}`}>
      {children}
    </Component>
  );
}

export default Typography;
