import { forwardRef } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { cn } from '../../lib/utils.js'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = forwardRef(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        'overflow-hidden rounded-2xl border border-navy/10 bg-surface shadow-card transition-shadow data-[state=open]:shadow-card-hover',
        className,
      )}
      {...props}
    />
  )
})

export const AccordionTrigger = forwardRef(function AccordionTrigger(
  { className, children, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'group flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5',
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          className="h-5 w-5 flex-none text-electric transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]:rotate-45"
          strokeWidth={2.5}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

export const AccordionContent = forwardRef(function AccordionContent(
  { className, children, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('px-5 pb-5 sm:px-6 sm:pb-6', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
})
