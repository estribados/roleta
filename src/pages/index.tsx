
import { useState } from 'react';
import Layout from '../components/layout';


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout>
      home
    </Layout>
  );
}
