"use client";

import liff from "@line/liff";

// LIFF configuration
const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || "";

if (!LIFF_ID) {
  throw new Error("NEXT_PUBLIC_LIFF_ID is required in environment variables");
}

export class LiffService {
  private static instance: LiffService;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  static getInstance(): LiffService {
    if (!LiffService.instance) {
      LiffService.instance = new LiffService();
    }
    return LiffService.instance;
  }

  async init(): Promise<void> {
    // ถ้ากำลัง init อยู่แล้ว ให้รอ promise เดิม
    if (this.initPromise) {
      return this.initPromise;
    }
    
    if (this.isInitialized) return;

    this.initPromise = this._doInit();
    return this.initPromise;
  }

  private async _doInit(): Promise<void> {
    try {
      await liff.init({ liffId: LIFF_ID });
      // After successful initialization, clean up OAuth query params (code & state) from the URL.
      // If these parameters remain in the address bar and the page is reloaded, LIFF will attempt
      // to exchange the same authorization code again, resulting in a 400 "invalid authorization code" error.
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        let shouldReplace = false;
        ["code", "state", "friendship_status_changed"].forEach((param) => {
          if (url.searchParams.has(param)) {
            url.searchParams.delete(param);
            shouldReplace = true;
          }
        });

        if (shouldReplace) {
          // Use replaceState to avoid adding a new history entry.
          window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
        }
      }
      this.isInitialized = true;
      // console.log("LIFF initialized successfully");
    } catch (error) {
      console.error("LIFF initialization failed:", error);
      throw error;
    }
  }

  async login(): Promise<void> {
    if (!this.isInitialized) await this.init();
    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: `${window.location.origin}/callback` });
    }
  }

  async logout(): Promise<void> {
    if (liff.isLoggedIn()) {
      liff.logout();
    }
  }

  async getProfile() {
    if (!this.isInitialized) {
      await this.init();
    }

    if (liff.isLoggedIn()) {
      return await liff.getProfile();
    }
    return null;
  }

  async getIdToken(): Promise<string | null> {
    if (!this.isInitialized) {
      await this.init();
    }

    if (liff.isLoggedIn()) {
      return liff.getIDToken();
    }
    return null;
  }

  async getAccessToken(): Promise<string | null> {
    if (!this.isInitialized) {
      await this.init();
    }

    if (liff.isLoggedIn()) {
      return liff.getAccessToken();
    }
    return null;
  }

  isInClient(): boolean {
    return this.isInitialized && liff.isInClient();
  }

  isLoggedIn(): boolean {
    return this.isInitialized && liff.isLoggedIn();
  }

  closeWindow(): void {
    if (liff.isInClient()) {
      liff.closeWindow();
    }
  }

  async getEmail(): Promise<string | undefined> {
    if (!this.isInitialized) {
      await this.init();
    }

    if (liff.isLoggedIn()) {
      const decoded = liff.getDecodedIDToken();
      return decoded?.email;
    }
    return undefined;
  }
}

export const liffService = LiffService.getInstance();
