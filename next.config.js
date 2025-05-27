/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/Draw-Editor-Enrique-Donaire-',
  assetPrefix: '/Draw-Editor-Enrique-Donaire-/',
  // Excluir rutas API de la exportación estática
  exportPathMap: async function (defaultPathMap) {
    const filteredPathMap = Object.keys(defaultPathMap).reduce((acc, path) => {
      if (!path.startsWith('/api')) {
        acc[path] = defaultPathMap[path];
      }
      return acc;
    }, {});
    return filteredPathMap;
  },
};

module.exports = nextConfig;