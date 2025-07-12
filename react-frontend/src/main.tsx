import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
const queryClient = new QueryClient();

{/* <QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider> */}


createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
)