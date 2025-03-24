
import { HTMLAttributes, ReactNode } from 'react';

// Use Omit to exclude the 'title' property from HTMLAttributes before extending
export interface GlassMorphicCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  
  // These properties are used in StatusDisplay cards
  icon?: ReactNode;
  value?: ReactNode;
  loading?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}
