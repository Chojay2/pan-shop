import React from 'react';
import { cn } from '@/lib/utils';

export interface PdTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const PdTextarea = React.forwardRef<HTMLTextAreaElement, PdTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-[16px]">
        {props.label && (
          <label className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {props.label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-[6px] border border-input bg-background px-[12px] py-[8px] text-[8px] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-[2px] disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
PdTextarea.displayName = 'Textarea';

export { PdTextarea };
