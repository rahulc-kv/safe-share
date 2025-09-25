// import type { User, Channel, Entity, Incident } from '../types';

export function randChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randId(): string {
  return Math.random().toString(36).slice(2, 9);
}

// export function makeIncident(override = false, users: User[], channels: Channel[], entities: Entity[]): Incident {
//   const u = randChoice(users);
//   const ch = randChoice(channels);
//   const e = randChoice(entities);
//   const sev = 'High';
//   const dec =  "nudge";
//   const overrides = override 
//     ? { 
//         type: "override" as const, 
//         reason: randChoice(["business_need", "false_positive", "approved_exception"] as const), 
//         text: "Urgent client request. Proceeding." 
//       } 
//     : { type: randChoice(["mask", "delete"] as const) };
//   const snippet = e.type === "PAN" ? "Client PAN: ABCDE1234F" 
//     : e.type === "Aadhaar" ? "Aadhaar: 1234 5678 9123" 
//     : e.type === "Secret" ? "AWS_KEY=AKIA..." 
//     : e.type === "Contract" ? "Per MSA 4.2 ..." 
//     : "email user@example.com";
  
//   return {
//     id: `inc_${randId()}`,
//     time: new Date().toISOString(),
//     severity: sev,
//     decision: dec,
//     tab: override ? "alert" : "success",
//     channel: ch,
//     user: u,
//     entities: [{ type: e.type, confidence: Math.round((0.65 + Math.random() * 0.3) * 100) / 100 }],
//     snippet_masked: snippet.replace(/(\d{4})(\d{4})(\d{1,4})/, "$1****$3"),
//     external_recipients: Math.random() > 0.5 ? ["partner.com"] : [],
//     policy: { id: "pol_7", name: "PAN & Secrets Coaching", version: "1.2.0" },
//     user_action: overrides,
//     status: "open",
//     assignee: null,
//     endpoint: { 
//       host: `LAP-${Math.floor(Math.random() * 300)}`, 
//       os: Math.random() > 0.5 ? "Windows" : "macOS", 
//       agent: "0.3.1", 
//       last_seen: new Date().toISOString()
//     }
//   };
// }
