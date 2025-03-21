
import { HTMLAttributes } from 'react';

export interface GlassMorphicCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  contentClassName?: string;
  className?: string;
  children: React.ReactNode;
}
