/**
 * Micro-sound utility for easter eggs
 * Respects reduced motion and reduced sound preferences
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      // AudioContext not supported, fail silently
      return null;
    }
  }
  
  return audioContext;
}

function shouldPlaySound(): boolean {
  if (typeof window === "undefined") return false;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return false;
  
  // Check for reduced sound preference (if available)
  const prefersReducedSound = window.matchMedia("(prefers-reduced-sound: reduce)").matches;
  if (prefersReducedSound) return false;
  
  return true;
}

export function playNavHoverSound(): void {
  if (!shouldPlaySound()) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    // Create a subtle, short sound (sine wave, ~800Hz, 50ms)
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Silently fail if audio can't be played
  }
}

