import type { Core } from '@strapi/strapi';

// Fichier optionnel : ici on garde le même comportement que la config de base
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: '127.0.0.1',
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default config;
