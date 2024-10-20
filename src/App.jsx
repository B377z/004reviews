// src/App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Blog from './Blog.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  );
}

// Correctly use default export here
export default App;
