export interface IElectronAPI {
  readPresentDir: () => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}