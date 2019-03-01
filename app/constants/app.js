// Constant to determine if the app is running in Chrome debugging mode
// The function atob exists in V8 but not JavaScriptCore
export const __REMOTEDEV__ = (typeof atob !== 'undefined');

// Enables the NRMA analysis card in the statistics page
export const enableAnalysisNRMA = true;

// Number of days for the station price history chart to fetch
export const priceHistoryRange = 60;

// Number of days for the price history chart to fetch
export const statisticsHistoryRange = 60;

// The frequency in minutes of database updates
export const syncFrequency = 30;