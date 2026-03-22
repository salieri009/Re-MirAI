/**
 * Toast Notification System
 * Provides simple toast notifications without external UI library
 */

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  duration?: number; // milliseconds, 0 = never auto-close
  id?: string;
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

let toastQueue: Toast[] = [];
let toastCallbacks: Set<(toasts: Toast[]) => void> = new Set();
let toastIdCounter = 0;

/**
 * Subscribe to toast updates
 */
export function subscribeToToasts(callback: (toasts: Toast[]) => void) {
  toastCallbacks.add(callback);
  return () => {
    toastCallbacks.delete(callback);
  };
}

/**
 * Notify all subscribers of toast change
 */
function notifySubscribers() {
  toastCallbacks.forEach(callback => callback([...toastQueue]));
}

/**
 * Show a toast notification
 */
export function showToast(
  message: string,
  type: ToastType = 'info',
  options: ToastOptions = {}
) {
  const {
    duration = type === 'error' ? 5000 : type === 'success' ? 3000 : 4000,
    id = `toast-${toastIdCounter++}`
  } = options;

  const toast: Toast = { id, message, type, duration };
  toastQueue.push(toast);
  notifySubscribers();

  // Auto-remove after duration (if duration > 0)
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  return id;
}

/**
 * Remove a specific toast
 */
export function removeToast(id: string) {
  toastQueue = toastQueue.filter(t => t.id !== id);
  notifySubscribers();
}

/**
 * Convenience methods
 */
export const toast = {
  success: (message: string, options?: ToastOptions) => 
    showToast(message, 'success', options),
  error: (message: string, options?: ToastOptions) => 
    showToast(message, 'error', { duration: 5000, ...options }),
  warning: (message: string, options?: ToastOptions) => 
    showToast(message, 'warning', options),
  info: (message: string, options?: ToastOptions) => 
    showToast(message, 'info', options),
};

/**
 * Get all current toasts
 */
export function getToasts(): Toast[] {
  return [...toastQueue];
}

/**
 * Clear all toasts
 */
export function clearAllToasts() {
  toastQueue = [];
  notifySubscribers();
}
