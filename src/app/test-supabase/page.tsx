import { createClient } from '@/lib/supabase/server'

export default async function TestSupabasePage() {
  const supabase = await createClient()
  
  // Checking the auth session allows us to verify connectivity 
  // without needing any tables or actual auth configured yet.
  const { data, error } = await supabase.auth.getSession()

  return (
    <div className="p-8 font-sans max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Status</h2>
        
        {supabase ? (
          <div className="text-green-600 dark:text-green-400 font-medium mb-4">
            ✅ Supabase client successfully initialized!
          </div>
        ) : (
          <div className="text-red-600 dark:text-red-400 font-medium mb-4">
            ❌ Failed to initialize Supabase client.
          </div>
        )}

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Environment Check:</h3>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL</span> Configured: {' '}
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Yes' : '❌ No'}
            </li>
            <li>
              <span className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> Configured: {' '}
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Yes' : '❌ No'}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Session Check (No Auth Required):</h3>
          <p className="text-xs text-gray-500 mb-2">If there is no error here, you are successfully connected to your Supabase project.</p>
          <pre className="mt-2 p-4 bg-gray-200 dark:bg-gray-900 rounded-md overflow-x-auto text-xs text-gray-800 dark:text-gray-200 font-mono">
            {JSON.stringify({ data, error }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
