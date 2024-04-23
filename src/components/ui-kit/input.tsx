import * as React from 'react';
import { cn } from '@/lib/utils';
import { useField } from 'formik';

export interface PdInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PdInput = React.forwardRef<HTMLInputElement, PdInputProps>(
  ({ className, type, ...props }, ref) => {
    const [field] = useField(props);

    return (
      <div className="grid w-full items-center gap-[16px]">
        {props.label && (
          <label className="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {props.label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-[40px] w-full rounded-[9999px] border border-input bg-background px-[12px] py-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-[14px] file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          )}
          ref={ref}
          {...field}
          {...props}
        />
      </div>
    );
  },
);
PdInput.displayName = 'PdInput';

export { PdInput as PdInput };
