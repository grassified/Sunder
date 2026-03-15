export interface Toast {
  id: number;
  message: string;
  type: "error" | "info";
}

class ToastState {
  toasts = $state<Toast[]>([]);
  private nextId = 0;

  add(message: string, type: "error" | "info" = "info", durationMs = 5000) {
    const id = this.nextId++;
    this.toasts = [...this.toasts, { id, message, type }];
    setTimeout(() => {
      this.remove(id);
    }, durationMs);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}

export const toastState = new ToastState();
