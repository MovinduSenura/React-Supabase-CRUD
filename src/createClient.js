import {createClient} from '@supabase/supabase-js'

export const supabase = createClient(
    "https://ctsukrerxxrwsdprfwqp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0c3VrcmVyeHhyd3NkcHJmd3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4OTQ0MTksImV4cCI6MjA0NDQ3MDQxOX0.8XBZU0IYsc0ie2czn0Ws9j89ubvV72_hwudvc0egz3A"
)