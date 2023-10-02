export const COLD = "Cold"
export const REFREQ = "Referral Requested"
export const REFERRED = "Referred"
export const APPLIED = "Applied"
export const INTERVIEW = "Interview"

export const StatusMap = new Map();

StatusMap.set(COLD, "cold")
StatusMap.set(REFREQ, "referralRequested")
StatusMap.set(REFERRED, "referred")
StatusMap.set(APPLIED, "applied")
StatusMap.set(INTERVIEW, "interview")
