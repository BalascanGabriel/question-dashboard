
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassMorphicCardProps } from "./types";

export function GlassMorphicCard({
  title,
  description,
  footer,
  children,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  ...props
}: GlassMorphicCardProps) {
  return (
    <Card 
      className={cn(
        "glass glass-dark border border-border/40 overflow-hidden transition-all duration-300",
        className
      )} 
      {...props}
    >
      {(title || description) && (
        <CardHeader className={cn("", headerClassName)}>
          {title && typeof title === "string" ? (
            <CardTitle>{title}</CardTitle>
          ) : (
            title
          )}
          {description && typeof description === "string" ? (
            <CardDescription>{description}</CardDescription>
          ) : (
            description
          )}
        </CardHeader>
      )}
      
      <CardContent className={cn("", contentClassName)}>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className={cn("", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
