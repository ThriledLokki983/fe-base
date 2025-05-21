# Troubleshooting

This section covers common issues you might encounter when working with this project and their solutions.

## npm Dependency Issues

### Missing or Incompatible Dependencies

If you encounter errors about missing dependencies or incompatibility issues:

```bash
# Clean install (removes node_modules and package-lock.json)
make install-clean
```

### Rollup Error: Cannot find module @rollup/rollup-linux-x64-gnu

This error is related to an npm bug with optional dependencies. There are two ways to solve this:

#### Method 1: Clean Installation

1. Remove node_modules and package-lock.json:
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Install with --no-optional flag:
   ```bash
   npm install --no-optional
   ```

Or use the shorthand:
```bash
make install-clean
```

#### Method 2: Use Safe Build

We've added a special build command that works around this Rollup issue:

```bash
make build-safe
```

Or directly with npm:
```bash
npm run build:safe
```

This uses the `ROLLUP_SKIP_NODEJS_NATIVE=1` environment variable to bypass the problematic Rollup native dependencies.

## Docker Issues

### Container Already Running

If you get an error about a container already in use:

```bash
# Stop all containers
make stop

# Then start again
make start-dev
```

### Docker Build Errors

If Docker build fails due to caching issues:

```bash
# Rebuild without cache
make rebuild
```

## GitHub Actions Issues

For issues related to GitHub Actions workflows, please refer to the [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md) document for detailed troubleshooting information.
