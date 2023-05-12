# ESP Flash Partitioner

A utility to easily generate partition table for ESP32 chips

## Rules

The rules used to compute the partition table is based on Espressif [docs](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/partition-tables.html):

- First partition should start at 36K offset
- Name field should be less than 16 bytes including Null terminator
- Type field can either be `app` or `data`
- Partition of type `app` should be multiple of 64K
- When OTA enabled at least 2 OTA `app` partitions should be defined
- OTA `app` partitions should have the same size
- OTA `data` partition should be 8K
- NVS `data` partition should be between 12K and 64K
- NVS_KEYS `data` partition should be 4K
- Coredump `data` partition should be 64K
- The offset field should be multiple of 4K
- The size field should be multiple of 4K
- The offset field for partitions of type `app` should be multiple of 64K
- The size & offset fields can be specified as decimal with prefix multiplier K
- Flags can either be empty string or `encrypted`
- Partitions of type `app` are always encrypted

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
