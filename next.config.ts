/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // necessário para next export funcionar
  eslint: {
    ignoreDuringBuilds: true, // ignora erros do eslint durante build
  },
  typescript: {
    ignoreBuildErrors: true, // ignora erros do typescript durante build
  },
  images: {
    unoptimized: true, // necessário para next export
  },
  // Se quiser usar basePath/assetPrefix depois, descomente e troque 'nome-do-repo'
  // basePath: '/nome-do-repo',
  // assetPrefix: '/nome-do-repo',
};

export default nextConfig;
