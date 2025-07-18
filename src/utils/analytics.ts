/**
 * Analytics and monitoring utilities
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

export interface ConversionEvent extends AnalyticsEvent {
  name: 'conversion_completed' | 'conversion_failed' | 'language_detected';
  properties: {
    fromLanguage: string;
    toLanguage: string;
    inputSize: number;
    conversionTime: number;
    success: boolean;
    errorMessage?: string;
  };
}

/**
 * Simple analytics tracker
 */
class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private userId?: string;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.loadUserId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadUserId(): void {
    try {
      this.userId = localStorage.getItem('unicode_user_id') || undefined;
      if (!this.userId) {
        this.userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('unicode_user_id', this.userId);
      }
    } catch (error) {
      // Handle localStorage not available
      console.warn('Could not access localStorage for user ID');
    }
  }

  track(name: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.events.push(event);
    this.sendEvent(event);

    // Keep only recent events in memory
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }
  }

  trackConversion(
    fromLanguage: string,
    toLanguage: string,
    inputSize: number,
    conversionTime: number,
    success: boolean,
    errorMessage?: string
  ): void {
    this.track(success ? 'conversion_completed' : 'conversion_failed', {
      fromLanguage,
      toLanguage,
      inputSize,
      conversionTime,
      success,
      errorMessage
    });
  }

  trackLanguageDetection(language: string, confidence: number): void {
    this.track('language_detected', {
      language,
      confidence
    });
  }

  trackPageView(path: string): void {
    this.track('page_view', {
      path,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    });
  }

  trackError(error: Error, context?: string): void {
    this.track('error_occurred', {
      message: error.message,
      stack: error.stack,
      context,
      userAgent: navigator.userAgent
    });
  }

  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // In a real application, you would send this to your analytics service
      // For now, we'll just log it in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', event);
      }

      // Example: Send to analytics service
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getSessionStats(): {
    sessionId: string;
    userId?: string;
    eventCount: number;
    sessionDuration: number;
    conversions: number;
    errors: number;
  } {
    const now = Date.now();
    const sessionStart = this.events.length > 0 ? this.events[0].timestamp : now;
    
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      eventCount: this.events.length,
      sessionDuration: now - sessionStart,
      conversions: this.events.filter(e => e.name === 'conversion_completed').length,
      errors: this.events.filter(e => e.name === 'error_occurred').length
    };
  }

  setUserId(userId: string): void {
    this.userId = userId;
    try {
      localStorage.setItem('unicode_user_id', userId);
    } catch (error) {
      console.warn('Could not save user ID to localStorage');
    }
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const analytics = new Analytics();

/**
 * React hook for analytics
 */
export function useAnalytics() {
  const trackConversion = React.useCallback(
    (fromLanguage: string, toLanguage: string, inputSize: number, conversionTime: number, success: boolean, errorMessage?: string) => {
      analytics.trackConversion(fromLanguage, toLanguage, inputSize, conversionTime, success, errorMessage);
    },
    []
  );

  const trackError = React.useCallback((error: Error, context?: string) => {
    analytics.trackError(error, context);
  }, []);

  const trackEvent = React.useCallback((name: string, properties?: Record<string, any>) => {
    analytics.track(name, properties);
  }, []);

  return {
    trackConversion,
    trackError,
    trackEvent,
    getSessionStats: analytics.getSessionStats.bind(analytics)
  };
}

/**
 * Performance monitoring
 */
export class PerformanceTracker {
  private marks: Map<string, number> = new Map();

  start(name: string): void {
    this.marks.set(name, performance.now());
  }

  end(name: string): number {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`Performance mark "${name}" not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(name);

    // Track performance metrics
    analytics.track('performance_metric', {
      name,
      duration,
      timestamp: Date.now()
    });

    return duration;
  }

  measure(name: string, fn: () => any): any {
    this.start(name);
    try {
      const result = fn();
      if (result instanceof Promise) {
        return result.finally(() => this.end(name));
      }
      this.end(name);
      return result;
    } catch (error) {
      this.end(name);
      throw error;
    }
  }
}

export const performanceTracker = new PerformanceTracker();

import React from 'react';