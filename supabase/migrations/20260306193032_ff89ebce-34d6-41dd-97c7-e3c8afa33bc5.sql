
-- Fix 1: Enable RLS on profiles_secure view (it's a view with security_invoker=on, 
-- but we need to ensure the base table policies are restrictive enough)
-- The profiles_secure view already has security_invoker=on so it respects base table RLS.
-- But the scanner flags it as having no RLS on the view itself.
-- We can't enable RLS on views directly in Postgres, but we can tighten the analytics_events policy.

-- Fix 2: Tighten analytics_events INSERT policy - require authentication
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;
CREATE POLICY "Authenticated users can insert analytics events"
ON public.analytics_events
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

-- Add size constraints on analytics_events to prevent abuse
ALTER TABLE public.analytics_events
ADD CONSTRAINT analytics_event_name_length CHECK (length(event_name) <= 100);
