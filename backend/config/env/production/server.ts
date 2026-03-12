import type { Core } from '@strapi/strapi';

// Configuration spécifique production : host récupéré depuis la variable d'environnement HOST
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default config;
