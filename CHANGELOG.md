# Changelog

## 1 (2025-11-17)

### Changed
- Refactored header component to use centralized app configuration instead of deployment mode context, simplifying header link management
- Updated app configuration to integrate with deployment mode system via `hydrateDeploymentMode()` from `lib/deployment-mode.ts`
- Renamed `ModeConfig.mode` to `ModeConfig.currentMode` for clarity in configuration types
- Removed mode-specific header and title logic from app configuration, now using static project mode defaults
- Updated configuration structure to separate static values from deployment mode configuration
- Enhanced configuration documentation with detailed interface definitions and usage examples

### Removed
- Removed `config/mode.config.ts` module, consolidating mode configuration into deployment mode system
- Removed `useDeploymentMode()` hook usage from header component
- Removed `getModeSpecificLinks()` and `getModeSpecificTitle()` helper functions from app configuration
