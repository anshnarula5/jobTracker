export const COLD = "Interested"
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

export const StatusIdMap = new Map();

StatusIdMap.set(COLD, 0)
StatusIdMap.set(REFREQ, 1)
StatusIdMap.set(REFERRED, 2)
StatusIdMap.set(APPLIED, 3)
StatusIdMap.set(INTERVIEW, 4)

export const StatusList = ["cold", "referralRequested", "referred", "applied", "interview"]