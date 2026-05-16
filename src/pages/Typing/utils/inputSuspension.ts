let isSuspended = false

export function setTypingInputSuspended(next: boolean) {
  isSuspended = next
}

export function isTypingInputSuspended() {
  return isSuspended
}
