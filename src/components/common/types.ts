
import { HTMLAttributes, ReactNode } from 'react';

export interface GlassMorphicCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  icon?: ReactNode;
  value: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}
