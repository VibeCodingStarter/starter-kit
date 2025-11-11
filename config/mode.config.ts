import { AppMode, ModeConfig } from './app.config.types';

/**
 * Get the current application mode from environment variables
 */
export function getModeConfig(): ModeConfig {
  const mode = (process.env.DEVKIT4AI_MODE || 'project') as AppMode;
  
  const config: ModeConfig = {
    mode,
  };

  // Add mode-specific configuration
  switch (mode) {
    case 'operator':
      config.operatorKey = process.env.DEVKIT4AI_OPERATOR_KEY;
      break;
    case 'project':
      config.projectId = process.env.DEVKIT4AI_PROJECT_ID;
      config.projectKey = process.env.DEVKIT4AI_PROJECT_KEY;
      break;
    case 'console':
      // Console mode for developers - no additional config needed
      break;
  }

  return config;
}

/**
 * Check if we're running in a specific mode
 */
export function isMode(targetMode: AppMode): boolean {
  return getModeConfig().mode === targetMode;
}

/**
 * Get mode-specific configuration
 */
export function getModeSpecificConfig() {
  const config = getModeConfig();
  
  return {
    isOperatorMode: config.mode === 'operator',
    isConsoleMode: config.mode === 'console', 
    isProjectMode: config.mode === 'project',
    operatorKey: config.operatorKey,
    projectId: config.projectId,
    projectKey: config.projectKey,
  };
}