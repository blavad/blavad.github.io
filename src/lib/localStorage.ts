/**
 * This function recovers a config from the local storage.
 * @param configName name of the config to recover
 * @returns the config value
 * @example recoverConfig('controllable') // returns 'true' or 'false'
 */
export function recoverConfig(configName: string) {
    const config = localStorage.getItem(`configs/${configName}`);
    return config;
}

/**
 * This function saves a config in the local storage.
 * @param configName name of the config to save
 * @param value value to save
 * @example saveConfig('controllable', true)
 */
export function saveConfig(configName: string, value: unknown) {
    localStorage.setItem(`configs/${configName}`, JSON.stringify(value));
}
