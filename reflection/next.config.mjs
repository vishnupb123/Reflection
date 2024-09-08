/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(mp4|webm|ogg)$/, // Add more extensions if needed
          type: 'asset/resource',    // Or 'file-loader' for older Webpack versions
          generator: {
            filename: 'static/media/[name].[hash][ext]', // Customize the output path
          },
        });
        return config;
      },
};

export default nextConfig;
