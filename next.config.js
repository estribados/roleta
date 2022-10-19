/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n:{
    locales:['pt-BR'],
    defaultLocale:'pt-BR'
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
